# Use the official lightweight Node.js image
FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app's code
COPY . .

# Build the React app
RUN npm run build

# Use a lightweight web server to serve the production build
RUN npm install -g serve

# Command to run when the container starts
CMD ["serve", "-s", "build", "-l", "3000"]

# Expose the port the app runs on
EXPOSE 3000






