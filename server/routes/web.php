<?php

/** @var \Laravel\Lumen\Routing\Router $router */

$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->group(['prefix' => 'api/v1'], function() use ($router) {

    // Product routes
    $router->get('products', ['uses' => 'ProductController@index']);
    $router->post('products', ['uses' => 'ProductController@store']);
    $router->get('products/{id}', ['uses' => 'ProductController@show']);
    $router->put('products/{id}', ['uses' => 'ProductController@update']);
    $router->delete('products/{id}', ['uses' => 'ProductController@destroy']);

    // Customer routes
    $router->get('customers', ['uses' => 'CustomerController@index']);
    $router->post('customers', ['uses' => 'CustomerController@store']);
    $router->get('customers/{id}', ['uses' => 'CustomerController@show']);
    $router->put('customers/{id}', ['uses' => 'CustomerController@update']);
    $router->delete('customers/{id}', ['uses' => 'CustomerController@destroy']);

    // Order routes
    $router->get('orders', ['uses' => 'OrderController@index']);
    $router->post('orders', ['uses' => 'OrderController@store']);
    $router->get('orders/{id}', ['uses' => 'OrderController@show']);
    $router->put('orders/{id}', ['uses' => 'OrderController@update']);
    $router->delete('orders/{id}', ['uses' => 'OrderController@destroy']);
});
