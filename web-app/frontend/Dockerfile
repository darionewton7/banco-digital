# Stage 1: Build the React application
FROM node:20-alpine AS build

# Install pnpm globally
RUN npm install -g pnpm

# Set the working directory
WORKDIR /app

# Copy package.json and pnpm-lock.yaml first for dependency caching
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the application for production
RUN pnpm build

# Stage 2: Serve the application using Nginx
FROM nginx:stable-alpine

# Copy the built files from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration (optional, but good for SPA routing)
# Create a default.conf file if needed to handle SPA routing
# Example default.conf content:
# server {
#   listen 80;
#   server_name localhost;
# 
#   location / {
#     root /usr/share/nginx/html;
#     index index.html index.htm;
#     try_files $uri $uri/ /index.html;
#   }
# 
#   # Optional: Proxy API requests to the backend
#   # location /api {
#   #   proxy_pass http://backend:5000; # Assuming backend service is named 'backend' in docker-compose
#   #   proxy_set_header Host $host;
#   #   proxy_set_header X-Real-IP $remote_addr;
#   #   proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
#   #   proxy_set_header X-Forwarded-Proto $scheme;
#   # }
# }
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

