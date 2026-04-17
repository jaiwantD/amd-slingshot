# Stage 1: Build the React Application
FROM node:20-alpine as build
WORKDIR /app
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Stage 2: Serve with Nginx securely
FROM nginx:alpine
# Copy our custom Nginx config to ensure React routing works properly and binds to PORT
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copy the built React assets
COPY --from=build /app/dist /usr/share/nginx/html

# Cloud Run injects the PORT env variable (usually 8080)
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
