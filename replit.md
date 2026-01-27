# Amrod E-Commerce Platform

## Overview

This is an e-commerce platform for Amrod, Africa's leading supplier of promotional products, corporate clothing, and gifts. The application provides a product catalog with category browsing, product details, and authentication for resellers. It features a modern React frontend with a Node.js/Express backend, using PostgreSQL for data persistence.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight alternative to React Router)
- **State Management**: TanStack React Query for server state caching and synchronization
- **Styling**: Tailwind CSS with shadcn/ui component library (New York style)
- **Animations**: Framer Motion for page transitions and micro-interactions
- **Build Tool**: Vite with hot module replacement

The frontend follows a component-based architecture with:
- `pages/` - Route-level components (HomePage, ProductListing, ProductDetail, AuthPage)
- `components/layout/` - Shared layout components (Header, Footer, Layout wrapper)
- `components/product/` - Product-specific components (ProductCard)
- `components/ui/` - Reusable shadcn/ui components
- `hooks/` - Custom React hooks for data fetching and auth state

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
- **Users**: id, email, firstName, lastName, profileImageUrl, timestamps (for Replit Auth)
- **Sessions**: PostgreSQL-backed session storage for authentication

### API Structure
The API is defined in `shared/routes.ts` with typed endpoints:
- `GET /api/products` - List products with optional category/search filters
- `GET /api/products/:id` - Get single product
- `GET /api/categories` - List all categories
- `GET /api/auth/user` - Get authenticated user (protected)

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
- **Google Fonts**: Open Sans font family loaded via CDN
- Branding assets reference external CDN URLs (promoafrica.com, amrod.co.za)