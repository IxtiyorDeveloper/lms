FROM node:18.12.1-alpine
#FROM registry.inter-nation.uz/intestmax/lms-web/frontend

RUN mkdir app
WORKDIR app
ENV TZ="Asia/Tashkent"

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . ./
RUN npm run-script build


ENV NODE_ENV=production
ENV HOST=0.0.0.0
EXPOSE 3000
ENTRYPOINT ["npm", "run", "start-server"]

