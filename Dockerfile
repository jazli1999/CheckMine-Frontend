FROM node:16

WORKDIR /home/frontend

COPY . .

ENV VITE_API_URL=http://localhost:8000/

RUN npm install
RUN npm install -g serve
RUN npm run build

CMD ["serve", "-s", "dist"]