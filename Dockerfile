# Use the official Node.js runtime as a parent image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Install python and build dependencies for SQLite3 native module
RUN apk add --no-cache python3 make g++ sqlite

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy the rest of the application code
COPY . .

# Create database directory with proper permissions
RUN mkdir -p /app/database && chmod 755 /app/database

# Build the application
RUN npm run build

# Create a non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# Change ownership of the app directory to the nodejs user
RUN chown -R nextjs:nodejs /app

# Switch to the non-root user
USER nextjs

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the application
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "3000"]
