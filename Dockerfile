
# Use an official Node.js runtime as the base image
FROM node:alpine

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json .

# Install dependencies
RUN npm install --force

# Copy the rest of the application code to the working directory
COPY . .

EXPOSE 4200

# Set the command to run the app on port 4200
CMD ["npm", "start"]