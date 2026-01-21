# Use Node.js for development
FROM node:20

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source files
COPY . .

# Expose development port
EXPOSE 3000 

# Default command
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
