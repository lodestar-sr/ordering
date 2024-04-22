FROM php:8.1-fpm

# Install dependencies
RUN apt-get update
RUN apt-get install -y --no-install-recommends \
    unzip \
    zip \
    curl \
    wait-for-it \
    libonig-dev

RUN docker-php-ext-install pdo_mysql
RUN docker-php-ext-install mbstring
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer

# Set working directory
WORKDIR /var/www/html

# Copy the application code to the Docker container
COPY . .

# Composer install command. Add this if your app needs to run composer install on build
RUN composer install --ignore-platform-reqs

# Run composer dump-autoload. Add this if your app needs to generate autoload files
RUN composer dump-autoload

# Copy the run_app script to the Docker container
RUN chmod +x run_app.sh

EXPOSE 9000

RUN pwd

CMD ["./run_app.sh"]
