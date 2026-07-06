FROM node:22-alpine AS base
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

FROM base AS deps
COPY package*.json ./
RUN npm ci --omit=dev

FROM base AS runtime
COPY --from=deps /app/node_modules ./node_modules
COPY src ./src
COPY package*.json ./

USER node
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000/health').then(r => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"

CMD ["node", "src/server.js"]