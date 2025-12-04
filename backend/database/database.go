package database

import (
	"database/sql"
	"fmt"
	"os"
	"time"

	_ "github.com/lib/pq"
)

func Connect() (*sql.DB, error) {
	host := os.Getenv("DB_HOST")
	if host == "" {
		host = "localhost"
	}

	port := os.Getenv("DB_PORT")
	if port == "" {
		port = "5432"
	}

	user := os.Getenv("DB_USER")
	if user == "" {
		user = "wishlist"
	}

	password := os.Getenv("DB_PASSWORD")
	if password == "" {
		password = "wishlist"
	}

	dbname := os.Getenv("DB_NAME")
	if dbname == "" {
		dbname = "wishlist"
	}

	connStr := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		host, port, user, password, dbname)

	var db *sql.DB
	var err error

	// Retry connection for up to 30 seconds (useful when waiting for postgres container)
	for i := 0; i < 30; i++ {
		db, err = sql.Open("postgres", connStr)
		if err != nil {
			return nil, err
		}

		err = db.Ping()
		if err == nil {
			break
		}

		time.Sleep(1 * time.Second)
	}

	if err != nil {
		return nil, fmt.Errorf("could not connect to database after 30 seconds: %w", err)
	}

	return db, nil
}
