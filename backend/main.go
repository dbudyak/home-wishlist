package main

import (
	"log"
	"os"

	"github.com/dima/go-wishlist/database"
	"github.com/dima/go-wishlist/handlers"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	// Initialize database connection
	db, err := database.Connect()
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}
	defer db.Close()

	// Run migrations
	if err := database.RunMigrations(db); err != nil {
		log.Fatal("Failed to run migrations:", err)
	}

	// Initialize Gin router
	r := gin.Default()

	// Configure CORS - allow all origins for home network deployment
	r.Use(cors.New(cors.Config{
		AllowAllOrigins:  true,
		AllowMethods:     []string{"GET", "POST", "DELETE"},
		AllowHeaders:     []string{"Content-Type"},
	}))

	// Initialize handlers
	h := handlers.NewHandler(db)

	// Routes
	api := r.Group("/api")
	{
		api.GET("/users", h.GetUsers)
		api.GET("/items/:userId", h.GetItemsByUser)
		api.POST("/items", h.CreateItem)
		api.DELETE("/items/:id", h.DeleteItem)
	}

	// Start server
	port := os.Getenv("PORT")
	if port == "" {
		port = "5200"
	}

	log.Printf("Server starting on port %s", port)
	if err := r.Run(":" + port); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}
