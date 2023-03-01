# Utiliser une image Alpine
FROM node:alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier tous les fichiers de l'application dans le répertoire de travail
COPY . .

# Exécuter npm install
RUN npm install

# Exposer le port 8090
EXPOSE 8090

# Exécuter la commande npm run watch
CMD ["npm", "run", "watch"]
