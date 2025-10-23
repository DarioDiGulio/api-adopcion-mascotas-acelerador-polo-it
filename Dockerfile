FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

# Install all dependencies (including devDependencies) for building
RUN npm install

# Copy source code
COPY . .

# Build TypeScript code
RUN npm run build

# Remove devDependencies after build
RUN npm prune --production

ENV NODE_ENV=production

EXPOSE ${PORT}

CMD ["npm", "start"]
