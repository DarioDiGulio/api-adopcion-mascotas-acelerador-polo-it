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
# Expose the port the app listens on. Use a concrete value so Docker/Render
# can parse the Dockerfile reliably. The app will still read process.env.PORT.
EXPOSE 3000

# Run the app
CMD ["npm", "start"]
