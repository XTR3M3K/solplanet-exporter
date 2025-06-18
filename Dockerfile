# Use official Node.js image with PNPM preinstalled
FROM node:24-alpine AS builder

# Install PNPM globally (if not preinstalled)
RUN corepack enable && corepack prepare pnpm@latest --activate

# Set working directory
WORKDIR /app

# Copy project files
COPY . .

# Install dependencies using PNPM
RUN pnpm install --frozen-lockfile

# Build the project
RUN pnpm run build

# ---- Production image ----
FROM node:24-alpine AS runner

# Set working directory
WORKDIR /app

# Copy only the built output and necessary files
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./

# Install only production dependencies
RUN corepack enable && corepack prepare pnpm@latest --activate \
  && pnpm install --prod --frozen-lockfile

# Command to run your app (adjust if needed)
CMD ["node", "dist/index.js"]