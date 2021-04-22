####################################################################################################
# Docker multistage build setup for the frontend app.
####################################################################################################

####################################################################################################
# Cache NPM mobuldes.
####################################################################################################
FROM node:13.10-alpine as npm
MAINTAINER qlack@eurodyn.com

# Set working directory
WORKDIR /app

# Add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# Install and cache app dependencies
COPY package.json /app/package.json
RUN npm install

# Download NPM modules.
RUN npm install

####################################################################################################
# Build application.
####################################################################################################
FROM node:13.10-alpine as build
MAINTAINER qlack@eurodyn.com

# Set working directory
WORKDIR /app

# Add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# Install and cache app dependencies
COPY --from=npm /app/node_modules /app/node_modules
COPY package.json /app/package.json
RUN npm install
RUN npm install -g @angular/cli

# Add app
COPY . /app

# Generate build
RUN ng build --prod --output-path=dist

####################################################################################################
# Create runtime container.
####################################################################################################
FROM nginx:1.19.1-alpine
MAINTAINER qlack@eurodyn.com

# Copy artifact build from the 'build environment'.
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx configuration.
COPY docker/conf.nginx /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Run nginx
CMD ["nginx", "-g", "daemon off;"]
