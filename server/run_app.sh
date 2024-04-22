#!/bin/bash

# Wait for the MySQL container. Use the same name as services.db from your Docker Compose file
wait-for-it db:3306 -t 0

# Run migrations
php artisan migrate

# Seeding the db. Should only run on test server
php artisan db:seed

# Run the PHP service
php -S 0.0.0.0:9000 -t public
