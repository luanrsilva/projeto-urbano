# Define a imagem base
FROM node:latest

# Cria um diretório para a sua aplicação
WORKDIR /usr/src/app

# Copia o arquivo package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia todos os arquivos da sua aplicação para o diretório de trabalho
COPY . .

# Expõe a porta do seu aplicativo Node.js
EXPOSE 3000

# Define variáveis de ambiente para se conectar ao MongoDB
# ENV MONGO_HOST localhost
# ENV MONGO_PORT 27017
# ENV MONGO_DB_NAME ponto-fixo

# Inicia o seu aplicativo Node.js
CMD ["npm", "start"]