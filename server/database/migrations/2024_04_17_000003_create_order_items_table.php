<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrderItemsTable extends Migration
{
    public function up()
    {
        if (!Schema::hasTable('order_items')) {
            Schema::create('order_items', function (Blueprint $table) {
                $table->unsignedBigInteger('order_id');
                $table->unsignedBigInteger('product_id');
                $table->integer('quantity');
                $table->decimal('unit_price', 8, 2);
                $table->decimal('total', 8, 2);

                $table->foreign('order_id')->references('id')->on('orders');
                $table->foreign('product_id')->references('id')->on('products');
            });
        }
    }

    public function down()
    {
        Schema::dropIfExists('order_items');
    }
}
