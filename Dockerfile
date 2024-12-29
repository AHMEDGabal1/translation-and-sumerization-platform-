# Step 1: Use a Node.js image to build the React app
FROM node:16 AS build

WORKDIR /app

# Copy package.json and package-lock.json first for dependency installation
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Install missing TypeScript types
RUN npm install --save-dev @types/react-dom

# Copy the rest of the source code
COPY . .

# Build the React app
RUN npm run build

# Step 2: Use an Nginx image to serve the build files
FROM nginx:alpine

# Copy build output to Nginx directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
