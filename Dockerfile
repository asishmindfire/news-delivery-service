FROM node:alpine
WORKDIR /app
COPY package.json ./
COPY .npmrc .

RUN npm install -f

# COPY
COPY . ./


EXPOSE 8082

# A command to start the server
CMD ["npm", "start"]