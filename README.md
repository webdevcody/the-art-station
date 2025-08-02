# The Art Station

A platform for artists to showcase and sell their artwork.

## Setup

1. `npm i`
2. `docker compose up`
3. `npm run db:migrate`
4. Set up environment variables (see Environment Variables section below)
5. `npm run dev`

## Features

### Shopping Cart

- **Non-admin users** can add artwork to their shopping cart
- Cart items are stored in localStorage for persistence
- Cart icon in header shows item count
- Full cart management with quantity controls
- Order summary with total calculation
- Admin users cannot access shopping cart functionality

### Cart Features

- Add items to cart from browse page or artwork detail pages
- View cart contents with item details and images
- Adjust quantities with +/- buttons or direct input
- Remove individual items or clear entire cart
- Real-time total calculation
- Responsive design for mobile and desktop

### Admin Features

- **Admin users** see "Edit Artwork" button instead of "Buy Now" on artwork detail pages
- Dedicated edit page with current artwork details and edit form
- Admin-only access to edit functionality
- Uses existing EditArtworkForm component for consistency

### Payment Processing

- **Stripe Integration** for secure payment processing
- Checkout button creates Stripe checkout session
- Success page after successful payment
- Cart automatically clears after successful checkout
- Support for credit card payments

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/art_station"

# Stripe Configuration
STRIPE_SECRET_KEY="sk_test_your_stripe_secret_key_here"
STRIPE_WEBHOOK_SECRET="whsec_your_stripe_webhook_secret_here"

# Application
BASE_URL="http://localhost:5173"
```

### Stripe Setup

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Get your API keys from the Stripe Dashboard
3. Add the keys to your `.env` file
4. For testing, use the test keys (they start with `sk_test_`)
5. Set up webhooks for order processing (see [STRIPE_WEBHOOK_SETUP.md](./STRIPE_WEBHOOK_SETUP.md))
