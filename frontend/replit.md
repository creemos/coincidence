# Overview

СвойЧеловек+ (formerly LoveConnect) is a modern dating application built with React and Express, fully localized for Russian-speaking users. The app features a compatibility-based matching system where users take personality tests to find compatible matches. Key features include user authentication, personality assessment questionnaires, compatibility matching algorithms, and a feed for browsing potential matches.

**Localization Status**: Complete Russian translation including:
- Site branding changed from "LoveConnect" to "СвойЧеловек+"
- All UI elements, navigation, forms, and messages translated to Russian
- Personality test questions and answer options in Russian
- User profiles, chat messages, and feed content in Russian
- Notification system with Russian text
- Proper Cyrillic character support throughout the application

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

The frontend is built with React and TypeScript, using a modern component-based architecture:

- **UI Framework**: React with TypeScript for type safety
- **Styling**: Tailwind CSS with shadcn/ui component library for consistent design
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management and caching
- **Form Handling**: React Hook Form with Zod for form validation and schema validation
- **Build Tool**: Vite for fast development and optimized production builds

The app follows a pages-based routing structure with dedicated pages for home, authentication, personality test, results, feed, chats, and profile. Components are organized using the shadcn/ui pattern with reusable UI components in the `/components/ui` directory. Global navigation is implemented through Header and Footer components providing consistent navigation across all pages.

## Backend Architecture

The backend uses a minimal Express.js setup with TypeScript:

- **Framework**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Storage Pattern**: Interface-based storage abstraction allowing for both in-memory and database implementations
- **API Design**: RESTful API structure with `/api` prefix for all routes
- **Development Setup**: Hot reloading with Vite integration for full-stack development

The server implements a modular route registration system and includes middleware for request logging and error handling.

## Data Storage Solutions

- **Database**: PostgreSQL as the primary database (configured via Drizzle)
- **ORM**: Drizzle ORM with schema-first approach
- **Schema Management**: Centralized schema definitions in `/shared/schema.ts`
- **Validation**: Zod schemas for runtime validation matching database schemas
- **Storage Abstraction**: Interface-based storage layer supporting both in-memory (development) and database (production) implementations

The database schema includes tables for users, test results, and matches, with proper relationships and constraints defined.

## Authentication and Authorization

Currently implements a mock authentication system:

- **Frontend**: Form-based authentication using React Hook Form and Zod validation
- **Session Management**: Placeholder for session-based authentication (connect-pg-simple dependency indicates planned PostgreSQL session store)
- **Route Protection**: Ready for implementation with the established routing structure

## External Dependencies

- **Database**: Neon Database serverless PostgreSQL (@neondatabase/serverless)
- **UI Components**: Radix UI primitives for accessible component foundations
- **Development Tools**: Replit-specific tooling for development environment integration
- **Font Services**: Google Fonts for typography (Inter, DM Sans, Fira Code, Geist Mono, Architects Daughter)

The application is designed to be deployed on Replit with specific configurations for the Replit environment, including development banners and cartographer integration for debugging.