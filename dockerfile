FROM php:8.2.24-fpm

# Install system dependencies and PHP extensions
RUN apt-get update && apt-get install -y \
    git \
    curl \
    unzip \
    libpq-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    libicu-dev \
    zip \
    && docker-php-ext-install pdo_pgsql pdo_mysql mbstring xml intl


# Install Node.js and npm
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g npm@latest

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www

# Copy Laravel project files
COPY . .

# Install Laravel dependencies
RUN composer install \
    && npm install

# Set permissions for storage and cache
RUN chown -R www-data:www-data /var/www \
    && chmod -R 775 /var/www/storage /var/www/bootstrap/cache

# Run Laravel setup commands
RUN php artisan key:generate \
    && php artisan storage:link

# Start Laravel server and npm dev server
CMD ["/bin/sh", "-c", "sleep 60 && php artisan migrate:fresh --seed && php artisan serve --host=0.0.0.0 --port=8000 & npm run dev"]
