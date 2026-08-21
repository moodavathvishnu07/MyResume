FROM node:20-alpine

WORKDIR /app

# Copy package files and install production dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy server code
COPY . .

# Expose backend API port
EXPOSE 5000

ENV PORT=5000
ENV NODE_ENV=production

# Start Express server
CMD ["node", "index.js"]
