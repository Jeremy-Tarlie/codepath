# Image PHP officielle avec Apache
FROM php:8.2-apache

# Installer git, unzip et zip
RUN apt-get update && \
    apt-get install -y git unzip zip && \
    rm -rf /var/lib/apt/lists/*

# Activer mod_rewrite pour Apache
RUN a2enmod rewrite

# Installer Composer (depuis l'image officielle Composer)
COPY --from=composer:2.7 /usr/bin/composer /usr/bin/composer

# Définir le répertoire de travail
WORKDIR /var/www/html

# Copier tous les fichiers
COPY . /var/www/html

# Installer les dépendances Composer
RUN composer install --no-interaction --prefer-dist --no-scripts

# Donner les bons droits (si nécessaire)
RUN chown -R www-data:www-data /var/www/html

# Autoriser les .htaccess
RUN sed -i 's/AllowOverride None/AllowOverride All/g' /etc/apache2/apache2.conf

# Exposer le port 80
EXPOSE 80

# Lancer Apache
CMD ["apache2-foreground"]
