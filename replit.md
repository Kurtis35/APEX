# WOS APEX / Amrod E-Commerce Platform

## Overview

This is a modern, world-class e-commerce platform for WOS APEX/Amrod, Africa's leading supplier of promotional products, corporate clothing, and gifts. The application features a fresh, mobile-ready design with full shopping cart functionality, checkout system, and admin dashboard. Customers can browse and purchase without creating accounts - they only provide details at checkout.

## Recent Changes (January 2026)

- Complete modern UI redesign with Inter font and cyan/blue color scheme
- Mobile-responsive header with hamburger menu and gradient navigation
- Modern hero section with animated background
- Redesigned product cards with hover effects and quick-add-to-cart
- Polished cart and checkout pages with modern styling
- Beautiful auth page with split-panel design
- Updated footer with modern dark gradient design
- Session-based cart system (no login required for shopping)
- Prices visible to everyone without login
- 22 real Amrod products with actual images and South African Rand pricing

## User Preferences

- Preferred communication style: Simple, everyday language
- Design style: Modern, clean, professional with cyan/blue accent colors
- No user accounts required for shopping (guest checkout only)
- Prices visible to all visitors

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight alternative to React Router)
- **State Management**: TanStack React Query for server state, React Context for cart
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Typography**: Inter font family
- **Animations**: Framer Motion for page transitions and micro-interactions
- **Build Tool**: Vite with hot module replacement

The frontend follows a component-based architecture with:
- `pages/` - Route-level components (HomePage, ProductListing, ProductDetail, AuthPage, CartPage, CheckoutPage, AdminPage)
- `components/layout/` - Shared layout components (Header, Footer, Layout wrapper)
- `components/product/` - Product-specific components (ProductCard)
- `components/ui/` - Reusable shadcn/ui components
- `contexts/` - React Context providers (CartContext, AdminContext)
- `hooks/` - Custom React hooks for data fetching

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM with PostgreSQL
- **Session Management**: express-session with connect-pg-simple for PostgreSQL-backed sessions
- **Authentication**: Replit Auth integration using OpenID Connect (OIDC)

The backend follows a modular structure:
- `server/index.ts` - Express app setup and middleware configuration
- `server/routes.ts` - API route definitions
- `server/storage.ts` - Database access layer implementing IStorage interface
- `server/db.ts` - Database connection setup
- `server/replit_integrations/auth/` - Authentication module with Replit Auth

### Data Models
- **Products**: id, name, description, category, price (stored in cents), imageUrl, stockStatus, brandingOptions (JSONB array)
- **Categories**: id, name, slug, imageUrl
- **Cart Items**: Session-based cart storage
- **Orders**: Customer info, shipping address, order items
- **Users**: id, email, firstName, lastName, profileImageUrl (for Replit Auth)
- **Sessions**: PostgreSQL-backed session storage

### API Structure
- `GET /api/products` - List products with optional category/search filters
- `GET /api/products/:id` - Get single product
- `GET /api/categories` - List all categories
- `GET /api/cart` - Get cart items
- `POST /api/cart` - Add item to cart
- `PATCH /api/cart/:id` - Update cart item quantity
- `DELETE /api/cart/:id` - Remove item from cart
- `POST /api/checkout` - Place order
- `GET /api/auth/user` - Get authenticated user
- Admin endpoints at `/api/admin/*`

### Admin System
- Access via shield icon in header
- Credentials: username "admin", password "admin123"
- Full CRUD operations for products

### Build System
- Development: Vite dev server with HMR, proxied through Express
- Production: esbuild bundles server code, Vite builds client to `dist/public`
- Scripts: `npm run dev` (development), `npm run build` (production build), `npm run db:push` (database migrations)

## External Dependencies

### Database
- **PostgreSQL**: Primary database, connection via `DATABASE_URL` environment variable
- **Drizzle ORM**: Type-safe database queries with automatic schema inference
- **Drizzle Kit**: Database migration management (`db:push` command)

### Authentication
- **Replit Auth**: OpenID Connect integration for user authentication
- Required environment variables: `ISSUER_URL`, `REPL_ID`, `SESSION_SECRET`, `DATABASE_URL`

### UI Components
- **shadcn/ui**: Pre-built accessible components (dialogs, dropdowns, forms, etc.)
- **Radix UI**: Underlying primitives for shadcn components
- **Lucide React**: Icon library

### Third-Party Services
- **Google Fonts**: Inter font family loaded via CDN
- Product images from Amrod CDN (https://cdn.promoafrica.com)
