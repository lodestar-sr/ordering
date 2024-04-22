# Use the official Node.js image as base for the builder stage
FROM node:21 AS builder

# Set the working directory in the container
WORKDIR /app

# Copy the rest of the application code to the working directory
COPY . .

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Only run yarn install if node_modules doesn't exist
RUN yarn install

# Build the application
RUN yarn build

# Use Nginx as the production server
FROM nginx:alpine

# Set the working directory in the container
WORKDIR /usr/share/nginx/html

# Copy the built app from the builder stage to the nginx public directory
COPY --from=builder /app/build .

# Update Nginx configuration to listen on port 3000
RUN sed -i 's/listen\(.*\)80;/listen\ 3000;/' /etc/nginx/conf.d/default.conf

# Expose port 3000
EXPOSE 3000

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
