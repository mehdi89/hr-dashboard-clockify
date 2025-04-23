-- Create users table for authentication
CREATE TABLE IF NOT EXISTS "users" (
  "id" SERIAL PRIMARY KEY,
  "username" VARCHAR(255) NOT NULL UNIQUE,
  "password_hash" VARCHAR(255) NOT NULL,
  "name" VARCHAR(255),
  "email" VARCHAR(255),
  "role" VARCHAR(50) DEFAULT 'user',
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add an initial admin user (password: admin123)
-- The password hash is for 'admin123' using bcrypt
INSERT INTO "users" ("username", "password_hash", "name", "email", "role")
VALUES ('admin', '$2a$10$JwRBQfUQvYrKRQgJDyOj8.W.L9ZP2Pmhd5bpxagxEzXXqrE0LgCZi', 'Administrator', 'admin@example.com', 'admin');
