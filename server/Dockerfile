FROM node:18-alpine

WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Build TypeScript code
RUN npm run build

# Remove development dependencies
RUN npm prune --production

EXPOSE 4000

ENV NODE_ENV=production

CMD ["node", "dist/index.js"]
