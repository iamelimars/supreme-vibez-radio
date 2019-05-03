# # Use a lighter version of Node as a parent image
# FROM mhart/alpine-node:8.11.4
# # Set the working directory to /client
# WORKDIR /client
# # copy package.json into the container at /client
# COPY package*.json /client/
# # install dependencies
# RUN npm install
# RUN npm install -g serve
# # Copy the current directory contents into the container at /client
# COPY . /client/
# # Make port 3000 available to the world outside this container
# # EXPOSE 3000
# # Production
# EXPOSE 5000
# # Run the app when the container launches
# RUN npm run build 

# CMD ["serve", "-s", "build"]
# # CMD ["npm", "run", "start"]

# FROM mhart/alpine-node:11 AS builder
# WORKDIR /app
# COPY . .
# RUN npm install
# RUN npm run build

# FROM mhart/alpine-node
# RUN npm install -g serve
# WORKDIR /app
# COPY --from=builder /app/build .
# CMD ["serve", "-p", "80", "-s", "."]

FROM nginx:1.15.2-alpine
COPY ./build /var/www
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
ENTRYPOINT ["nginx","-g","daemon off;"]