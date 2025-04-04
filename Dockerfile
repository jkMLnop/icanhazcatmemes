FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app and build it
COPY . .
RUN npm run build

# Install the `serve` package globally
RUN npm install -g serve

# Expose port 3000 for the static server
EXPOSE 3000

# Serve the built files
CMD ["serve", "-s", "build"]