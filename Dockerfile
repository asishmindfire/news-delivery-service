FROM node:alpine
WORKDIR /app
COPY package*.json ./

# COPY
COPY . ./

RUN npm install -f

# A command to start the server
CMD ["npm", "start"]