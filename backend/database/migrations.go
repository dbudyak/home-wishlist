package database

import (
	"database/sql"
	"log"
)

func RunMigrations(db *sql.DB) error {
	log.Println("Running database migrations...")

	// Create users table
	_, err := db.Exec(`
		CREATE TABLE IF NOT EXISTS users (
			id SERIAL PRIMARY KEY,
			name VARCHAR(100) NOT NULL UNIQUE,
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
		)
	`)
	if err != nil {
		return err
	}

	// Create wishlist_items table
	_, err = db.Exec(`
		CREATE TABLE IF NOT EXISTS wishlist_items (
			id SERIAL PRIMARY KEY,
			user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
			title VARCHAR(255) NOT NULL,
			url TEXT,
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
		)
	`)
	if err != nil {
		return err
	}

	// Insert hardcoded users if they don't exist
	_, err = db.Exec(`
		INSERT INTO users (name) VALUES ('Dima'), ('Aleksandra')
		ON CONFLICT (name) DO NOTHING
	`)
	if err != nil {
		return err
	}

	log.Println("Database migrations completed successfully")
	return nil
}
