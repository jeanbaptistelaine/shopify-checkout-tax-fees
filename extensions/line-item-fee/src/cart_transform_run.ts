import {
  CountryCode,
  LineUpdateOperation,
  type CartTransformRunInput,
  type CartTransformRunResult,
  type Operation,
} from '../generated/api'

const NO_CHANGES: CartTransformRunResult = {
  operations: [],
}

const FEE_PERCENTAGE = 0.1 // 10% fee

export function cartTransformRun(
  input: CartTransformRunInput
): CartTransformRunResult {
  const isUsCustomer = input.localization.country.isoCode === CountryCode.Us

  if (!isUsCustomer) {
    return NO_CHANGES
  }

  const operations = input.cart.lines.reduce((acc: Operation[], cartLine) => {
    const updateOperation = buildFeeUpdateOperation(cartLine)
    return [...acc, { lineUpdate: updateOperation }]
  }, [])

  return operations.length > 0 ? { operations } : NO_CHANGES
}

function buildFeeUpdateOperation(
  cartLine: CartTransformRunInput['cart']['lines'][number]
): LineUpdateOperation {
  const originalAmount = parseFloat(cartLine.cost.amountPerQuantity.amount)
  const feeAmount = originalAmount * FEE_PERCENTAGE
  const newAmount = originalAmount + feeAmount

  return {
    cartLineId: cartLine.id,
    price: {
      adjustment: {
        fixedPricePerUnit: {
          amount: newAmount.toString(),
        },
      },
    },
  }
}
