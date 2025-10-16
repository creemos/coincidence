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

The backend uses Spring Boot with Java:

- **Framework**: Spring Boot 3.5.4 with Java 19
- **Database ORM**: Spring Data JPA with Hibernate for database operations
- **Security**: Spring Security with JWT authentication
- **API Design**: RESTful API structure with `/api` prefix for all routes
- **Build Tool**: Maven for dependency management and building

The server implements authentication endpoints (`/api/auth/login`, `/api/auth/signup`), user management (`/api/users`), and JWT-based security. The backend runs on port 8080 and the frontend proxies API requests to it.

## Data Storage Solutions

- **Database**: PostgreSQL via Replit's Neon database integration
- **ORM**: Spring Data JPA with Hibernate
- **Schema Management**: Hibernate auto-generates schema from JPA entities
- **Entities**: User, Authority, and UserRole entities with proper relationships

The database schema includes tables for users, authorities, and user-authority relationships. The backend is configured to automatically update the schema based on JPA entity definitions.

## Authentication and Authorization

Implements JWT-based authentication:

- **Frontend**: Form-based authentication using React Hook Form and Zod validation
- **Backend**: Spring Security with JWT tokens for stateless authentication
- **Token Generation**: JWT tokens with configurable expiration time
- **Password Security**: BCrypt password hashing
- **Route Protection**: JWT filter for protected endpoints

## External Dependencies

- **Database**: Replit's integrated Neon PostgreSQL database
- **UI Components**: Radix UI primitives for accessible component foundations
- **Development Tools**: Replit-specific tooling for development environment integration
- **Backend Libraries**: Spring Boot, Spring Security, JWT (io.jsonwebtoken), Lombok

## Replit Environment Setup

The application is configured to run in the Replit environment with:
- Frontend on port 5000 (Vite dev server with host 0.0.0.0)
- Backend on port 8080 (Spring Boot application)
- Frontend proxies `/api` requests to the backend
- Database credentials managed through Replit environment variables
- Custom startup script for backend to parse DATABASE_URL into JDBC format