# ----------------------
# Stage 1: Build React app
# ----------------------
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all files and build React app
COPY . .
RUN npm run build

# ----------------------
# Stage 2: Production image with Nginx
# ----------------------
FROM nginx:alpine

# Copy build files from stage 1
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
