# Usar a imagem do Node.js como base
FROM node:latest AS builder

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos de package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o código fonte da aplicação para o diretório de trabalho
COPY . .

FROM nginx:alpine
VOLUME /var/cache/nginx
COPY --from=builder app/dist/* /usr/share/nginx/html/
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
