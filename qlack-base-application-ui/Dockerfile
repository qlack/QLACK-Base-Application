####################################################################################################
# Docker multistage build setup for the frontend app.
####################################################################################################

####################################################################################################
# Cache NPM mobuldes.
####################################################################################################
FROM node:16.13.1-alpine as npm
MAINTAINER qlack@eurodyn.com

# Set working directory
WORKDIR /app

# Add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# Install and cache app dependencies
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm install

####################################################################################################
# Build application.
####################################################################################################
FROM node:16.13.1-alpine as build
MAINTAINER qlack@eurodyn.com

# Set working directory
WORKDIR /app

# Add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# Install and cache app dependencies
COPY --from=npm /app/node_modules /app/node_modules

# Add app
COPY . /app

# Generate build
RUN ng build --output-path=dist

####################################################################################################
# Create runtime container.
####################################################################################################
FROM nginx:1.21.5-alpine
MAINTAINER qlack@eurodyn.com

# Copy artifact build from the 'build environment'.
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx configuration.
COPY docker/conf.nginx /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Run nginx
CMD ["nginx", "-g", "daemon off;"]
