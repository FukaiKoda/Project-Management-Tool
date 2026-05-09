# Project Context: Real-time Project Management Tool (Trello Clone)

## Overview
This is the final, "Hard" level project from the backend practice roadmap. The goal is to build a production-ready, scalable application with real-time features and complex business rules. 

## Tech Stack
- **Framework:** Express.js (v5, using ES Modules)
- **Database:** PostgreSQL
- **ORM:** TypeORM (Class-based, heavily uses decorators to prepare for NestJS)
- **Authentication:** JWT (Short-lived Access + Long-lived Refresh tokens via HttpOnly cookies) + OAuth (Google/GitHub via Passport)
- **Hashing:** argon2
- **Real-time:** WebSockets (`socket.io`)
- **Caching & Sessions:** Redis (`connect-redis`, `redis`)
- **Validation:** Zod
- **File Uploads:** `multer`

## Key Features & Resources
- **Resources:** Workspaces, Boards, Lists, Cards. Highly relational data structures requiring advanced queries and transactions.
- **Real-time Activity:** Instant updates using WebSockets when a user interacts with the board (e.g., moving a card).
- **File Attachments:** Attaching files to cards.
- **Transactions:** Ensuring atomic database operations (e.g., rolling back if board creation fails halfway).

## Architecture: Clean Architecture
We are adopting strict boundaries to isolate domain logic from the web framework and database:
1. **Entities / Domain Layer:** Core business objects and rules. Knows nothing about Express or TypeORM.
2. **Repositories / Data Access Layer:** Interfaces and implementations for database interactions. TypeORM lives here.
3. **Services / Use Case Layer:** Application logic. Uses repositories and domain entities.
4. **Controllers / Presentation Layer:** Handles HTTP requests and responses. Express request/response objects should ideally not leak beyond this layer.
5. **Routes Layer:** Connects Express endpoints to Controllers.
6. **WebSockets Layer:** Handles real-time events.
7. **Config / Setup:** Express setup, Database connections, DI setup.

### Design Patterns to Implement
- **Builder Pattern:** For complex query construction.
- **Factory Pattern:** For object creation (e.g., different types of notifications or complex entities).
- **Observer Pattern:** For event handling (e.g., sending activity feeds, triggering WebSocket broadcasts from domain events).
- **Dependency Injection:** Services should receive their dependencies (repositories, other services) through their constructors, allowing for easier testing and decoupling.

## Best Practices
- **Clean Code & SOLID Principles:** Classes should have a single responsibility. Interfaces (or base classes) should be used for abstraction.
- **Error Handling:** Global error handling middleware. Use custom error classes (e.g., `NotFoundError`, `UnauthorizedError`).
- **Validation:** Validate all incoming requests at the controller level using Zod.
- **Security:** Helmet, CORS, Rate Limiting, securely stored tokens.

## Current Setup & Next Steps
- `package.json` initialized with core Express, auth (passport, argon2, jwt), and redis packages.
- ES Modules (`type: "module"`) enabled.
- **Pending Installs:** `typeorm`, `pg`, `reflect-metadata` (required for TypeORM decorators), `socket.io`, `multer`.

### Project Status: Paused for Fundamentals Learning
The project is temporarily paused. The user is currently taking time to learn fundamental relational database concepts before diving into TypeORM implementation. 
**Topics being studied:**
1. Tables, Primary Keys, and Foreign Keys.
2. The 3 types of relationships: One-to-One, One-to-Many, and Many-to-Many (and Junction Tables).
3. The conceptual understanding of Database Joins.

**Next Step upon Return:** 
We will review what was learned, conceptualize the database schema (Workspace, Board, List, Card, User), and translate those relationships into TypeORM entities. After that, we will proceed with the initial server architecture setup.
