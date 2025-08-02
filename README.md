# The Art Station

A platform for artists to showcase and sell their artwork.

## Setup

1. `npm i`
2. `docker compose up`
3. `npm run db:migrate`
4. `npm run dev`

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
