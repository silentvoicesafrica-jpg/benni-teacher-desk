FROM node:22-alpine

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

COPY package.json ./
COPY server.mjs ./
COPY index.html ./
COPY styles.css ./
COPY app.js ./
COPY sw.js ./
COPY manifest.webmanifest ./
COPY logo.svg ./
COPY public ./public

EXPOSE 3000
CMD ["node", "server.mjs"]
