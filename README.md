# Family Wishlist

A simple Go-based wishlist service for managing wishlist items for two users. Built with Go (Gin), React + TypeScript, and PostgreSQL.

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

## Deployment as Systemd Service

For production deployment on a server (like a home NAS), you can set up the wishlist service to start automatically on boot:

1. Clone the repository on your server:
```bash
cd /opt  # or your preferred location
git clone git@github.com:dbudyak/home-wishlist.git
cd home-wishlist
```

2. Update the systemd service file with the correct path:
```bash
# Edit wishlist.service and replace /path/to/home-wishlist with actual path
sed -i "s|/path/to/home-wishlist|$(pwd)|g" wishlist.service
```

3. Install and enable the systemd service:
```bash
sudo cp wishlist.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable wishlist.service
sudo systemctl start wishlist.service
```

4. Check the service status:
```bash
sudo systemctl status wishlist.service
```

5. View logs:
```bash
sudo journalctl -u wishlist.service -f
```

### Systemd Service Management

```bash
# Start the service
sudo systemctl start wishlist.service

# Stop the service
sudo systemctl stop wishlist.service

# Restart the service
sudo systemctl restart wishlist.service

# Disable auto-start on boot
sudo systemctl disable wishlist.service

# View logs
sudo journalctl -u wishlist.service
```

## Configuration

### API URL Auto-Detection

For development, you can override this by setting the `VITE_API_URL` environment variable during build.

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

## License

MIT
