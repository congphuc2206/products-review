FROM node:20-alpine

WORKDIR /app

# Copy package info
COPY package*.json ./

# Install only production dependencies
RUN npm install --omit=dev

# Copy backend source code
COPY server.js ./
COPY src/ ./src/

EXPOSE 3000

# Run pure node server
CMD ["node", "server.js"]
