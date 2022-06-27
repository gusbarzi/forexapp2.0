FROM node

WORKDIR /forex-app

COPY package*.json /forex-app/
COPY yarn.lock /forex-app/

RUN yarn
RUN npm install --force

COPY . /forex-app/

EXPOSE 3001

CMD ["yarn", "run", "dev"]
