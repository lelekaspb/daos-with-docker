# daos-with-docker
Study project.  Dockerizing a full-stack application built with React, NestJS, and MongoDB.
# Dockerization of React app

In this project, we will containerise an existing application using Docker and DockerCompose. We have created two docker files, two dockerignore and one docker-compose file for this project. Finally, we defined a docker-compose.yml file to run the containerized application.

# Dockerizing

We are going to start from an existing react vite app using nest js and mongodb. Find the starter code on Check out our [Github](https://github.com/lelekaspb/daos-with-docker) or follow a step by step tutorial to setup an react vite and nest js app.

# Step 1. Building a docker image for the frontend (react vite)

To build a Docker image, we want a copy of all the source files inside a container, build the project (also inside the container) and then run the container.
so create a Dockerfile inside the root of front-end app with this code below.

//Dockerfile

```
FROM node:19
WORKDIR /app
COPY package*.json /app/
COPY . .
RUN npm install
```

We also need to ignore the files (with node_modules) that we do not want to copy to docker image. For this we need a .dockerignore file in the root of the front-end project. Dockerignore is used to speed up the process otherwise we can skip it.

//.dockerignore

```
node_modules
```

# Step 2. Building a docker image for the back-end (nestjs)

it will follow the same principles for the docker file and .dockerignore so we are showing the code for it below.

//Dockerfile

```
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
ENV port=3007
EXPOSE 3007
CMD ["npm", "start"]
```

//.dockerignore

```
node_modules
```

# Step 3. Building a docker compose file for the project.

Docker Compose is a tool for defining and running multi-container Docker applications so in this case we need a compose file so it will be having two container one for the front-end and one for the back-end.

//docker-compose.yml

```
version: "3.7"

services:
  frontend:
    build: ./daos-frontend
    image: frontimage
    container_name: frontcontainer
    restart: unless-stopped
    depends_on:
      - backend
    ports:
      - "3000:3000"
    command: bash -c " npm run dev"
  backend:
    build: ./daos-backend
    image: backimage
    container_name: backcontainer
    restart: unless-stopped
    ports:
      - "5000:3007"
    environment:
      connection_string: mongodb://mongodb:27017/users?directConnection=true
      port: 3007
      jwt_secret: dragons
    depends_on:
      - mongodb
    networks:
      - backdbnetwork
  mongodb:
    image: mongo
    container_name: mongocontainer
    restart: always
    ports:
      - "27017:27017"
    volumes:
      - dbdata:/data/db
    networks:
      - backdbnetwork

volumes:
  dbdata:
networks:
  backdbnetwork:
    driver: bridge
```

# Step 4. Run the docker compose file in the cli.

Compose works in all environments: production, staging, development, testing, as well as CI workflows. It also has commands for managing the whole lifecycle of your application:

so run this commmand in the cli and it will work.

```
docker compose up
```
