# Stripe Webhook Setup

This document explains how to set up the Stripe webhook endpoint for order processing.

## Environment Variables

Add the following environment variables to your `.env` file:

```env
STRIPE_SECRET_KEY=sk_test_... # Your Stripe secret key
STRIPE_WEBHOOK_SECRET=whsec_... # Your Stripe webhook secret
BASE_URL=http://localhost:5173 # Your application base URL
```

## Webhook Endpoint

The webhook endpoint is available at:

```
POST /api/webhooks/stripe
```

## Setting up the Webhook in Stripe Dashboard

1. Go to your Stripe Dashboard
2. Navigate to Developers > Webhooks
3. Click "Add endpoint"
4. Set the endpoint URL to: `https://your-domain.com/api/webhooks/stripe`
5. Select the following events to listen for:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
6. Click "Add endpoint"
7. Copy the webhook signing secret and add it to your environment variables as `STRIPE_WEBHOOK_SECRET`

## How it Works

1. When a customer completes a checkout session, Stripe sends a `checkout.session.completed` event to the webhook
2. The webhook validates the request signature using the webhook secret
3. If valid, it extracts the order items from the session metadata
4. Creates an order record in the database with status "processed"
5. Creates order item records for each artwork purchased
6. Returns a success response to Stripe

## Testing

You can test the webhook locally using the Stripe CLI:

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login to your Stripe account
stripe login

# Forward webhooks to your local server
stripe listen --forward-to localhost:5173/api/webhooks/stripe
```

This will give you a webhook secret that you can use for local testing.

## Error Handling

The webhook includes comprehensive error handling:

- Validates the webhook signature
- Handles missing metadata gracefully
- Logs errors for debugging
- Returns appropriate HTTP status codes

## Database Schema

The webhook creates records in two tables:

- `order`: Main order information
- `order_item`: Individual items in the order

Both tables are automatically created by the database migrations.
