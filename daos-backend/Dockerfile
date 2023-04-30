FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install 
COPY . .
RUN npm run build
ENV port=3007
EXPOSE 3007
CMD ["npm", "start"]