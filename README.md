# DatingApp-net8

Full-stack dating app portfolio project built with **.NET 8 Web API** and **Angular**.

The project demonstrates a typical authenticated web application with user profiles, likes, messaging, role-based admin functionality, SQL Server persistence, and real-time features powered by SignalR.

## Features

* User registration and login with JWT authentication
* Role-based authorization for admin functionality
* Member profiles with filtering, sorting and pagination
* Like/favorite users flow
* Private messaging between users
* Real-time presence and messaging with SignalR
* Photo upload support
* Global API error handling middleware
* Angular frontend with route guards, interceptors and reusable components
* SQL Server database with EF Core migrations
* Docker Compose setup for local SQL Server development

## Tech Stack

### Backend

* .NET 8
* ASP.NET Core Web API
* Entity Framework Core
* SQL Server
* ASP.NET Core Identity
* JWT authentication
* SignalR
* AutoMapper
* Cloudinary integration

### Frontend

* Angular
* TypeScript
* RxJS
* Bootstrap / Bootswatch
* ngx-bootstrap
* ngx-toastr
* ngx-spinner
* SignalR client

### Infrastructure

* Docker Compose
* SQL Server container
* .NET user-secrets for local development secrets

## Project Structure

```text
DatingApp-net8/
  API/                  # ASP.NET Core Web API
  client/               # Angular frontend
  DatingApp.sln         # .NET solution
  docker-compose.yaml   # Local SQL Server setup
  .env.example          # Example local environment variables
```

## Getting Started

### Prerequisites

* .NET 8 SDK
* Node.js and npm
* Docker Desktop
* Angular CLI

### 1. Clone the repository

```bash
git clone https://github.com/Stellce/DatingApp-net8.git
cd DatingApp-net8
```

### 2. Configure local environment variables

Create a local `.env` file in the repository root:

```env
MSSQL_SA_PASSWORD=your-password
```

The `.env` file is used only for local Docker Compose configuration and should not be committed.

### 3. Start SQL Server

```bash
docker compose up -d
```

### 4. Configure .NET user-secrets

The API uses .NET user-secrets for local development configuration.

Initialize user-secrets for the API project:

```bash
dotnet user-secrets init --project API
```

Set the JWT token key:

```bash
dotnet user-secrets set "TokenKey" "replace-with-a-long-local-development-secret" --project API
```

Set the SQL Server connection string:

```bash
dotnet user-secrets set "ConnectionStrings:DefaultConnection" "Server=localhost,1433;Database=DatingDB;User Id=sa;Password=your-password;TrustServerCertificate=True" --project API
```

Set Cloudinary credentials for photo upload functionality:

```bash
dotnet user-secrets set "CloudinarySettings:CloudName" "your-cloud-name" --project API
dotnet user-secrets set "CloudinarySettings:ApiKey" "your-api-key" --project API
dotnet user-secrets set "CloudinarySettings:ApiSecret" "your-api-secret" --project API
```

### 5. Run the backend

```bash
dotnet run --project API
```

The API applies EF Core migrations on startup for local development.

### 6. Run the frontend

```bash
cd client
npm install
npm start
```

Open the Angular app in the browser at:

```text
https://localhost:4200
```

## Build

Backend:

```bash
dotnet build DatingApp.sln
```

Frontend:

```bash
cd client
npm run build
```

The Angular production build is generated into `API/wwwroot` so the ASP.NET Core backend can serve the frontend. Generated build output is intentionally ignored by Git.

## Status

This is a portfolio project created to demonstrate full-stack development with .NET 8, Angular, SQL Server, JWT authentication and SignalR. It is intended for learning and portfolio presentation, not as a production dating platform.
