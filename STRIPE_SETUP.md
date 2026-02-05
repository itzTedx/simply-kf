# Stripe Payment Integration Setup

This document explains how to set up and use the Stripe payment integration in your SimplyKF e-commerce application.

## Prerequisites

1. A Stripe account (sign up at [stripe.com](https://stripe.com))
2. Stripe API keys from your Stripe dashboard

## Setup Instructions

### 1. Install Dependencies

The following Stripe packages have been added to your `package.json`:

```json
{
  "@stripe/stripe-js": "^4.0.0",
  "@stripe/react-stripe-js": "^3.0.0",
  "stripe": "^17.0.0"
}
```

Install them with:
```bash
pnpm install
# or
npm install
```

### 2. Configure Environment Variables

Update your `.env.local` file with your Stripe API keys:

```env
# Get these from your Stripe Dashboard: https://dashboard.stripe.com/apikeys
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

# Optional: For webhook handling
STRIPE_WEBHOOK_SECRET=whsec_...
```

**Important:**
- Use test keys for development
- Never expose your secret key in client-side code
- Add `.env.local` to your `.gitignore` file

### 3. Get Your Stripe Keys

1. Log in to your [Stripe Dashboard](https://dashboard.stripe.com)
2. Go to **Developers** → **API keys**
3. Copy the **Publishable key** (starts with `pk_test_` for test mode)
4. Copy the **Secret key** (starts with `sk_test_` for test mode)
5. Add them to your `.env.local` file

## How It Works

### Payment Flow

1. **Cart Page** (`/cart`) - Customers view and manage their cart
2. **Checkout** - Click "Proceed to Checkout" to start payment
3. **Payment Intent** - Server creates a payment intent via Stripe API
4. **Stripe Elements** - Customer enters payment details securely
5. **Payment Confirmation** - Stripe processes the payment
6. **Success/Error Pages** - Customer sees the result

### Key Components

- **Payment Context** (`/src/contexts/payment-context.tsx`) - Manages payment state
- **Stripe Elements** (`/src/components/payment/stripe-elements.tsx`) - Secure payment form
- **Checkout Component** (`/src/components/payment/checkout.tsx`) - Main checkout flow
- **API Route** (`/src/app/api/stripe/create-payment-intent/route.ts`) - Server-side payment intent creation

### Pages

- **Cart** (`/cart`) - Shopping cart management
- **Payment Success** (`/payment/success`) - Post-payment success page
- **Payment Canceled** (`/payment/canceled`) - Payment cancellation page

## Testing

### Test Cards

Use these Stripe test cards for testing:

| Card Number | Description |
|-------------|-------------|
| 4242424242424242 | Visa (successful payment) |
| 4000000000000002 | Card declined |
| 4000000000009995 | Insufficient funds |
| 4000000000009987 | Lost card |

### 3D Secure Testing

Use card `4000002760003184` to test 3D Secure authentication.

## Security Features

- **PCI Compliance**: Payment details never touch your server
- **HTTPS Required**: Stripe requires HTTPS in production
- **Webhook Verification**: Optional webhook signature verification
- **Amount Validation**: Server-side validation of payment amounts

## Customization

### Styling

The Stripe Elements are styled to match your theme. Customize the appearance in `stripe-elements.tsx`:

```typescript
appearance: {
  theme: 'stripe',
  variables: {
    colorPrimary: '#000000',
    colorBackground: '#ffffff',
    // ... more variables
  },
}
```

### Currency

Change the default currency in the API route (`/api/stripe/create-payment-intent/route.ts`):

```typescript
const { amount, currency = 'eur' } = await request.json();
```

## Production Deployment

1. **Switch to Live Mode** in your Stripe dashboard
2. **Update Environment Variables** with live API keys
3. **Configure Webhooks** for real-time payment status updates
4. **Enable HTTPS** on your domain
5. **Test thoroughly** with small amounts

## Webhooks (Optional)

For production, set up webhooks to handle:
- Payment success/failure events
- Subscription management
- Customer updates

Configure webhook endpoint in your Stripe dashboard pointing to:
`/api/stripe/webhooks`

## Troubleshooting

### Common Issues

1. **"Invalid API Key"**: Check your environment variables
2. **"Payment Intent Creation Failed"**: Verify your Stripe account status
3. **"Elements Not Loading"**: Ensure `@stripe/react-stripe-js` is properly installed
4. **CORS Errors**: Make sure your domain is allowed in Stripe dashboard

### Debug Mode

Enable debug logging by adding to your environment:
```env
STRIPE_DEBUG=true
```

## Support

- [Stripe Documentation](https://stripe.com/docs)
- [React Stripe.js Documentation](https://stripe.com/docs/stripe-js/react)
- [Next.js + Stripe Guide](https://stripe.com/docs/payments/quickstart)
