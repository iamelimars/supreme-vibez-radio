# Use a lighter version of Node as a parent image
FROM mhart/alpine-node:8.11.4
# Set the working directory to /api
WORKDIR /backend
# copy package.json into the container at /api
# COPY package*.json /backend/
COPY package.json package.json 
#copy package.json to the container
# install dependencies
RUN npm install
# Copy the current directory contents into the container at /api
# COPY . /backend/
COPY . .
# Make port 5000 available to the world outside this container
EXPOSE 5001

RUN npm install -g nodemon 
#// install nodemon for changes on the fly
# Run the app when the container launches
# CMD ["npm", "start"]
CMD [ "nodemon", "index.js" ] 
#// start server inside container
