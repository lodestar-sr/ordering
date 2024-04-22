# Project Description

This project provides RESTful APIs for managing customers, products, and orders using PHP/Lumen framework and MySQL database.

## Installation

### Requirements

- PHP >= 8.1
- MySQL
- Composer

### Steps

1. Install dependencies:

    ```bash
    composer install
    ```

2. Set up environment variables:

    Copy the `.env.example` file to `.env` and configure your database connection settings.

3. Run migrations:

    ```bash
    php artisan migrate
    ```

4. Seed the database (optional, for testing):

    ```bash
    php artisan db:seed
    ```

## Usage

### Running the PHP service

You can run the PHP service using the following command:

```bash
php -S 0.0.0.0:9000 -t public
```

### Endpoints

#### Products

- `GET /api/v1/products`: Get all products
- `POST /api/v1/products`: Create a new product
- `GET /api/v1/products/{id}`: Get a product by ID
- `PUT /api/v1/products/{id}`: Update a product
- `DELETE /api/v1/products/{id}`: Delete a product

#### Customers

- `GET /api/v1/customers`: Get all customers
- `POST /api/v1/customers`: Create a new customer
- `GET /api/v1/customers/{id}`: Get a customer by ID
- `PUT /api/v1/customers/{id}`: Update a customer
- `DELETE /api/v1/customers/{id}`: Delete a customer

#### Orders

- `GET /api/v1/orders`: Get all orders
- `POST /api/v1/orders`: Create a new order
- `GET /api/v1/orders/{id}`: Get an order by ID
- `PUT /api/v1/orders/{id}`: Update an order
- `DELETE /api/v1/orders/{id}`: Delete an order

## Additional Commands

- To regenerate autoload files:

    ```bash
    composer dump-autoload
    ```

## Notes

- Make sure to set up your database correctly before running migrations.
- Seeding the database should only be done on a test server.
