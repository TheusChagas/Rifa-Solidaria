# Rifa Solidária - AI Coding Assistant Instructions

## Project Overview
This is a Next.js 15 raffle/lottery platform ("Rifa Solidária") built with TypeScript, Tailwind CSS, and shadcn/ui components. The app supports two distinct game modes: traditional numbered raffles and "fazendinha" (animal-based lottery inspired by "jogo do bicho").

## Key Architecture Patterns

### Data Layer
- **Central Types**: All interfaces defined in `types.ts` - the `Rifa` interface is the core data model with 50+ properties
- **Mock Data**: Currently using mock data in `lib/getRifaID.ts` with hardcoded raffles - treat as database replacement for now
- **Data Fetching**: Utility functions in `lib/` directory (getApoiadores, getCompradores, etc.) provide data access layer

#### Database Migration Strategy
When implementing a real database, follow this migration pattern:
- **Recommended**: PostgreSQL with Prisma ORM for type safety
- **Alternative**: Supabase for real-time features out of the box
- **Migration Steps**:
  1. Replace mock functions in `lib/getRifaID.ts` with database queries
  2. Add database schema matching `Rifa` interface from `types.ts`
  3. Update utility functions to use async database operations
  4. Add database connection pooling for performance
  5. Implement proper error handling and retry logic

### Authentication & Routes
- **Simple Auth**: Cookie-based auth using test credentials (`usuario@teste.com` / `12345678`) in `app/api/auth/`
- **Route Structure**: 
  - Public routes: `/`, `/compra/[id]`, `/login`, `/register`
  - Protected vendor routes: `/vendedor/*` with shared layout and sidebar
  - API routes: `/api/auth/*` and `/api/rifas/*`

### UI Architecture
- **Component Structure**: 
  - `components/shared/` for global components (Navbar)
  - `components/ui/` for shadcn/ui primitives
  - `components/compra/` for purchase flow
  - `components/vendedor/` for vendor dashboard
  - `components/home/` for landing page
- **Styling**: Custom Tailwind theme with brand colors (`verde`, `coral`, `branco`, `preto`) in `tailwind.config.ts`

## Game Modes & Business Logic

### Traditional Raffles
- Number-based selection (1-100 typical range)
- Individual number purchase with reservation system
- Purchase flow in `PaginaRifa.tsx` with phone validation

### Fazendinha Mode
- Animal-based lottery using `jogoDoBicho` array from `types.ts`
- 25 animals each with 4 numbers (Avestruz: 1-4, Águia: 5-8, etc.)
- Separate UI in `PaginaFazendinha.tsx`
- Animal icons stored in `assets/` directory

### Core Features
- **Reservations**: Numbers can be reserved temporarily before purchase
- **Payment Methods**: Pix, card, cash support
- **Draw Options**: Preset lottery times (PTN, PTM, etc.) in `drawOptions` array
- **Contacts**: Multiple contact persons per raffle with WhatsApp integration

#### Payment Processing Integration
**Recommended**: Stripe for Brazil with local payment methods
- **Setup**: Install `@stripe/stripe-js` and `stripe` packages
- **Implementation**: 
  - Create `/api/payment/` routes for webhook handling
  - Add payment status tracking to `Rifa` interface
  - Support Pix via Stripe Brazil or integrate with local providers
- **Alternative**: Mercado Pago for better local payment support in Brazil
- **Security**: Always validate payments server-side before updating raffle status

#### Real-time Features Implementation
**Recommended**: Server-Sent Events (SSE) or WebSockets for live updates
- **WebSocket Option**: Use `pusher-js` or `socket.io` for instant updates
- **SSE Option**: Simpler implementation with `/api/events/[rifaId]` endpoint
- **Implementation Strategy**:
  1. Add real-time context provider in `app/layout.tsx`
  2. Create `useRealTimeRifa` hook for components
  3. Update `PaginaRifa.tsx` and `PaginaFazendinha.tsx` to listen for changes
  4. Broadcast events on: number purchase, reservation, payment confirmation
- **Alternative**: Supabase real-time subscriptions if using Supabase as database

## Development Workflows

### Running the Project
```bash
npm run dev --turbopack  # Development with Turbopack
npm run build           # Production build
npm run start          # Production server
npm run lint           # ESLint checking
```

#### Testing Strategy
**Recommended**: Jest + React Testing Library for unit/integration tests
- **Setup**: Install `@testing-library/react`, `@testing-library/jest-dom`, `jest-environment-jsdom`
- **Test Structure**: Create `__tests__/` directories alongside components
- **Key Areas to Test**:
  - Phone number validation in `lib/getCompradores.ts`
  - Number selection logic in `PaginaRifa.tsx`
  - Animal selection in `PaginaFazendinha.tsx`
  - Payment flow integration
  - Authentication flow
- **E2E Testing**: Consider Playwright for full user journey testing
- **Example Test Pattern**:
```tsx
// __tests__/components/compra/PaginaRifa.test.tsx
import { render, screen } from '@testing-library/react';
import PaginaRifa from '@/components/compra/PaginaRifa';

describe('PaginaRifa', () => {
  it('validates phone numbers correctly', () => {
    // Test phone validation logic
  });
});
```

#### Deployment Strategy
**Recommended**: Vercel (free tier) for Next.js projects
- **Setup**: Connect GitHub repository to Vercel
- **Environment Variables**: Configure in Vercel dashboard
- **Database**: Use Supabase (free tier) or Railway (free tier) for PostgreSQL
- **Alternative Free Options**:
  - Netlify for static generation
  - Railway for full-stack with database
  - Render for containerized deployment

### Component Development
- Use shadcn/ui components from `components/ui/`
- Follow the existing pattern: separate components for each major feature
- Dialogs for modals (CriaRifaDialog, ReservaRifaDialog, etc.)
- Form handling with react-hook-form and zod validation

### Styling Conventions
- Use custom Tailwind colors (`verde-500`, `coral-400`, etc.)
- Responsive design with mobile-first approach
- Sidebar collapses to sheet on mobile (`components/vendedor/Sidebar.tsx`)
- Custom animations defined inline in components when needed

## Key Dependencies & Patterns

### UI Libraries
- **shadcn/ui**: Primary component library with Radix UI primitives
- **Lucide React**: Icon system
- **Embla Carousel**: For image carousels
- **Tailwind CSS**: Styling with custom theme

### Data Handling
- **Zod**: Schema validation (imported but validate forms with it)
- **React Hook Form**: Form management
- **Date-fns**: Date manipulation for lottery draw times

#### Database Integration Patterns
When migrating from mock data to real database:
```tsx
// Before (mock): lib/getRifaID.ts
export const getAllRifas = async (): Promise<Rifa[]> => {
  return Object.values(rifasMockBase);
};

// After (database): lib/getRifaID.ts
export const getAllRifas = async (): Promise<Rifa[]> => {
  const rifas = await prisma.rifa.findMany({
    include: { contatos: true, premios: true }
  });
  return rifas;
};
```

#### Real-time Implementation Example
```tsx
// hooks/useRealTimeRifa.ts
import { useEffect, useState } from 'react';
import { Rifa } from '@/types';

export const useRealTimeRifa = (rifaId: string) => {
  const [rifa, setRifa] = useState<Rifa | null>(null);
  
  useEffect(() => {
    const eventSource = new EventSource(`/api/events/${rifaId}`);
    
    eventSource.onmessage = (event) => {
      const updatedRifa = JSON.parse(event.data);
      setRifa(updatedRifa);
    };
    
    return () => eventSource.close();
  }, [rifaId]);
  
  return rifa;
};
```

### Mobile Considerations
- Responsive sidebar using Sheet component on mobile
- Touch-friendly number selection grids
- Mobile-optimized purchase flow

## Common Patterns

### Modal Dialogs
```tsx
// Standard dialog pattern used throughout
<Dialog>
  <DialogTrigger asChild>
    <Button>Open</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
    </DialogHeader>
    {/* Content */}
  </DialogContent>
</Dialog>
```

### Data Fetching
```tsx
// Async functions in lib/ directory
const rifas = await getAllRifas();
const comprador = getCompradorByPhone(phone);
```

### Routing
- Use Next.js App Router patterns
- Dynamic routes: `[id]` for individual raffles
- Layout inheritance for vendor dashboard

## Important Notes
- Phone number validation is critical - use `validatePhoneNumber` utility
- Animal mode detection via `fazendinha` boolean property
- Logo component imported from `assets/Logo.png`
- Portuguese language throughout - maintain consistency
- Test user credentials hardcoded for development phase
