# Project Context: Real-time Project Management Tool (Trello Clone)

## Overview
This is the final, "Hard" level project from the backend practice roadmap. The goal is to build a production-ready, scalable application with real-time features and complex business rules. 

## Tech Stack
- **Framework:** Express.js (v5, using ES Modules)
- **Database:** PostgreSQL
- **ORM:** TypeORM (Class-based, heavily uses decorators to prepare for NestJS)
- **Authentication:** Session-Based Authentication + OAuth (Google/GitHub via Passport)
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
- `package.json` initialized with core Express, auth (passport, argon2), and redis packages.
- ES Modules (`type: "module"`) enabled.
- All core dependencies installed (`typeorm`, `pg`, `reflect-metadata`, `socket.io`, `multer`, `zod`).

### Project Status: Backend Core Implementation
We have established the database layer with TypeORM and implemented the authentication flow. We are now moving towards implementing the core project management features.

**Recent Accomplishments:**
1. Upgraded the project to support TypeScript execution for TypeORM entities (via `tsx` and `tsconfig.json`) while maintaining `.js` for Express logic.
2. Created core TypeORM entities: `User`, `Workspace`, `Board`, `List`, `Card`, and `WorkspaceMember`.
3. Configured PostgreSQL database connection and TypeORM DataSource in `src/config/data-source.js` and initialized it in `app.js`.
4. Implemented Authentication flow (Repository, Service, Controller, Route) with Passport session-based auth backed by Redis.
5. Implemented Workspace Management CRUD operations (Repository, Service, Controller, Route) with scoped access.

**Next Steps (Backend Core):**
1. **Workspace Member Management:**
   - Implement endpoints to add and remove members from a workspace.
   - Implement role-based checks for member management.
2. **Board Management:**
   - Implement `BoardRepository`, `BoardService`, `BoardController`, and routes.
   - Support CRUD operations for boards within a workspace.
3. **List & Card Management:**
   - Implement repositories, services, and controllers for Lists and Cards.
   - Support drag-and-drop operations (moving cards between lists) on the backend (updating positions/list IDs).
4. **Validation & Authorization:**
   - Implement Zod validation for all incoming requests in new controllers.
   - Add middleware to check user permissions for specific workspaces and boards.
5. **Real-time Features (WebSockets):**
   - Integrate `socket.io` to broadcast board updates (card moves, edits) to all connected clients viewing the board.
6. **File Attachments:**
   - Use `multer` to handle file uploads for card attachments.
