# ==========================================
# Multi-Stage Production Dockerfile (All-in-One)
# Builds React frontend and serves via Express.js
# ==========================================

# Stage 1: Build the React Client
FROM node:20-alpine AS client-builder
WORKDIR /app/client

COPY client/package*.json ./
RUN npm ci

COPY client/ ./
RUN npm run build

# Stage 2: Production Server Runner
FROM node:20-alpine
WORKDIR /app

# Install server production dependencies
COPY server/package*.json ./server/
RUN cd server && npm ci --only=production

# Copy server application source
COPY server/ ./server/

# Copy built React client assets into server/dist for static serving
COPY --from=client-builder /app/client/dist ./server/dist

WORKDIR /app/server

EXPOSE 5000

ENV PORT=5000
ENV NODE_ENV=production

# Run Express Server
CMD ["node", "index.js"]
