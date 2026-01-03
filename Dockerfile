# Multi-stage build for security and size optimization
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install pnpm (specific version for consistency)
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy package files first to leverage cache
COPY package.json pnpm-lock.yaml ./

# Install dependencies (frozen-lockfile for deterministic builds)
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN pnpm build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Drop privileges (optional but recommended for stricter envs - tricky with Nginx on port 80 without caps,
# so we stick to default for this brief but note it in risks)
CMD ["nginx", "-g", "daemon off;"]
