# Shopify Checkout Tax & Fees

A Shopify app that adds additional fees for US customers at checkout.

## What it does

- Detects when customers are shipping to the United States
- Automatically adds a configured fee to their cart
- Works seamlessly with Shopify's native checkout flow

## Installation

### Store Requirements
- Development store or Shopify Plus plan
- Store must have Checkout Extensibility enabled

### Setup Steps

1. **Install and deploy the app**
   ```bash
   npm install
   npm run deploy
   ```

2. **Activate the function**
   
   After deployment, you must activate the Cart Transform function by running this GraphQL mutation from within your app:
   
   ```graphql
   mutation {
     cartTransformCreate(
       blockOnFailure: false,
       functionId: "YOUR_FUNCTION_ID"
     ) {
       cartTransform { id }
       userErrors { field message }
     }
   }
   ```
   
   **Important:** This mutation must be executed using your app's access token, not through GraphiQL.

3. **Verify activation**
   - Check your Partner Dashboard for function runs
   - Test a US checkout to confirm fees are applied

## Getting started

### Requirements

1. You must [download and install Node.js](https://nodejs.org/en/download/) if you don't already have it.
1. You must [create a Shopify partner account](https://partners.shopify.com/signup) if you don’t have one.
1. You must create a store for testing if you don't have one, either a [development store](https://help.shopify.com/en/partners/dashboard/development-stores#create-a-development-store) or a [Shopify Plus sandbox store](https://help.shopify.com/en/partners/dashboard/managing-stores/plus-sandbox-store).

### Installing the template

This template can be installed using your preferred package manager:

Using yarn:

```shell
yarn create @shopify/app
```

Using npm:

```shell
npm init @shopify/app@latest
```

Using pnpm:

```shell
pnpm create @shopify/app@latest
```

This will clone the template and install the required dependencies.

#### Local Development

[The Shopify CLI](https://shopify.dev/docs/apps/tools/cli) connects to an app in your Partners dashboard. It provides environment variables and runs commands in parallel.

You can develop locally using your preferred package manager. Run one of the following commands from the root of your app.

Using yarn:

```shell
yarn dev
```

Using npm:

```shell
npm run dev
```

Using pnpm:

```shell
pnpm run dev
```

Open the URL generated in your console. Once you grant permission to the app, you can start development (such as generating extensions).

## Developer resources

- [Introduction to Shopify apps](https://shopify.dev/docs/apps/getting-started)
- [App extensions](https://shopify.dev/docs/apps/build/app-extensions)
- [Extension only apps](https://shopify.dev/docs/apps/build/app-extensions/build-extension-only-app)
- [Shopify CLI](https://shopify.dev/docs/apps/tools/cli)
