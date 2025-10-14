FROM node:20-alpine

# Define work directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json before of the code
COPY package*.json ./

# Install dependencies (just in the base image)
RUN npm install

# Expose port
EXPOSE 3000

# Default command
CMD ["npx", "ts-node-dev", "--respawn", "--transpile-only", "src/server.ts"]