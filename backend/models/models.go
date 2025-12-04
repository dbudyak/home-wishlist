package models

import "time"

type User struct {
	ID        int       `json:"id"`
	Name      string    `json:"name"`
	CreatedAt time.Time `json:"created_at"`
}

type WishlistItem struct {
	ID        int       `json:"id"`
	UserID    int       `json:"user_id"`
	Title     string    `json:"title"`
	URL       string    `json:"url"`
	CreatedAt time.Time `json:"created_at"`
}

type CreateItemRequest struct {
	UserID int    `json:"user_id" binding:"required"`
	Title  string `json:"title" binding:"required"`
	URL    string `json:"url"`
}
