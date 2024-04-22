<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    public function up()
    {
        if (!Schema::hasTable('orders')) {
            Schema::create('orders', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->unsignedBigInteger('customer_id');
                $table->foreign('customer_id')->references('id')->on('customers');
                $table->decimal('total', 8, 2)->default(0);
            });
        }
    }

    public function down()
    {
        Schema::dropIfExists('orders');
    }
}
