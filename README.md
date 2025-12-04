# Family Wishlist

A simple Go-based wishlist service for managing wishlist items for two users: Dima and Aleksandra. Built with Go (Gin), React + TypeScript, and PostgreSQL.

## Features

- Two-column layout for separate wishlists
- Add items with title and optional URL
- Delete items
- Persistent storage with PostgreSQL
- Fully containerized with Docker
- Survives server restarts

## Architecture

- **Backend**: Go + Gin framework (Port 5200)
- **Frontend**: React + TypeScript + Vite, served by nginx (Port 5201)
- **Database**: PostgreSQL (Port 5202)

## Prerequisites

- Docker
- Docker Compose

## Quick Start

1. Clone the repository and navigate to the project directory:
```bash
cd go-wishlist
```

2. Start all services:
```bash
docker-compose up -d
```

3. Wait for all services to start (about 10-30 seconds), then access the application:
   - Frontend: http://localhost:5201
   - Backend API: http://localhost:5200
   - PostgreSQL: localhost:5202

## Development

### Backend Development

```bash
cd backend
go mod download
go run main.go
```

### Frontend Development

```bash
cd frontend
npm install
npm run dev
```

## API Endpoints

- `GET /api/users` - Get all users
- `GET /api/items/:userId` - Get items for a specific user
- `POST /api/items` - Create a new item
  ```json
  {
    "user_id": 1,
    "title": "Item title",
    "url": "https://example.com"
  }
  ```
- `DELETE /api/items/:id` - Delete an item

## Database Schema

### users
- `id` (SERIAL PRIMARY KEY)
- `name` (VARCHAR)
- `created_at` (TIMESTAMP)

### wishlist_items
- `id` (SERIAL PRIMARY KEY)
- `user_id` (INTEGER, FK to users)
- `title` (VARCHAR)
- `url` (TEXT)
- `created_at` (TIMESTAMP)

## Stopping the Services

```bash
docker-compose down
```

To remove all data (including database):
```bash
docker-compose down -v
```

## Rebuilding After Changes

```bash
docker-compose up -d --build
```

## Troubleshooting

### Services not starting
Check logs:
```bash
docker-compose logs -f
```

### Database connection issues
Ensure PostgreSQL is healthy:
```bash
docker-compose ps
```

### Frontend not connecting to backend
Check that CORS is properly configured and both services are running.

## Project Structure

```
go-wishlist/
├── backend/
│   ├── main.go              # Entry point
│   ├── database/            # Database connection and migrations
│   ├── handlers/            # API handlers
│   ├── models/              # Data models
│   ├── go.mod
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── App.tsx          # Main app component
│   │   ├── WishlistColumn.tsx  # Column component
│   │   ├── api.ts           # API client
│   │   ├── types.ts         # TypeScript types
│   │   └── index.css        # Styles
│   ├── nginx.conf
│   ├── Dockerfile
│   └── package.json
└── docker-compose.yml
```

## License

MIT
