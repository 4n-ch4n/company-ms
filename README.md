# Company Microservice (company-ms)

## Overview
The Company Microservice is a core component of a multi-tenant Subscription Management SaaS platform. It handles the primary lifecycle of tenant organizations (companies), ensuring data integrity, managing global identifiers (like Tax IDs), and orchestrating the provisioning of billing subscriptions.

Built with a strict adherence to Domain-Driven Design (DDD) principles, this service is highly scalable, loosely coupled, and well-tested, reflecting enterprise-grade TypeScript architecture.

## Responsibilities
- **Company Identity Management:** Handles the creation, retrieval, and updates of company core data.
- **Cross-Service Orchestration:** Communicates synchronously with the Subscription Microservice to automatically provision subscription plans and billing cycles upon company creation.
- **Data Validation:** Enforces strict domain invariants (e.g., preventing duplicate Tax IDs).

## Tech Stack
- **Runtime:** Node.js
- **Language:** TypeScript
- **Web Framework:** Hono (optimized for edge and modern Node environments)
- **Validation & Documentation:** Zod + OpenAPI (Auto-generated Swagger documentation)
- **Database:** MongoDB
- **HTTP Client:** Axios (for inter-service communication)

## Architecture
The service adheres to a layered Domain-Driven Design (DDD) utilizing an Onion Architecture:
- **Domain Layer (`src/domain/`)**: The core business logic, entities, value objects, and repository interfaces. Agnostic to external frameworks.
- **Application Layer (`src/application/`)**: Application services mapping DTOs to Domain Entities and coordinating use cases.
- **Infrastructure Layer (`src/infrastructure/`)**: Concrete implementations of repositories (MongoDB) and external service clients.
- **Presentation Layer (`src/presentation/`)**: Hono-based HTTP routing, Zod payload validation, and OpenAPI documentation endpoints.

## Local Development

### Prerequisites
- Node.js (v18 or higher recommended)
- pnpm (package manager used across the monorepo)
- A running instance of MongoDB

### Installation
1. Install dependencies:
```bash
pnpm install
```

2. Configure environment variables in an `.env` file at the root of `company-ms`:
```env
PORT=3000
API_BASE_URL=/api
DOCS_URL=/public/api-docs
OPENAPI_URL=/public/openapi.json
DB_MONGO_CONNECTION_STRING=mongodb://localhost:27017/company-db
SUBSCRIPTION_MS_URL=http://localhost:3002/api
SECURITY_MS_URL=http://localhost:3001/api
JWT_SECRET=your-secret-key
```

### Running the Application
Start the development server:
```bash
pnpm run dev
```

By default, the server will start on port 3000. You can view the OpenAPI documentation at:
```
http://localhost:3000/public/api-docs
```

## Production Details
This application ships with a `Dockerfile` optimized for minimal attack surface and fast startup times, making it ideal for deployments to containerized environments like AWS ECS, EKS, or Kubernetes clusters.
