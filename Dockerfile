FROM node:18.15.0
EXPOSE 3000
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
CMD ["npm", "start"]