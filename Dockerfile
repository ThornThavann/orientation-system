# Use node image
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy app source code
COPY . .

# Build production React app
RUN npm run build

# Install serve globally
RUN npm install -g serve

# Expose the port you want (3304)
EXPOSE 3000

# Serve the app on port 3304
CMD ["serve", "-s", "build", "-l", "3000"]
