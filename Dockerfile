# Build stage
FROM node:23-alpine as builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
ARG SENTRY_DSN
ENV SENTRY_DSN=$SENTRY_DSN

RUN npm run build

# Start the application
CMD ["npm", "start"]