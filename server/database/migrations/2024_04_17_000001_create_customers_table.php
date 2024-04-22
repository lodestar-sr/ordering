<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCustomersTable extends Migration
{
    public function up()
    {
        if (!Schema::hasTable('customers')) {
            Schema::create('customers', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->string('name');
                $table->date('since');
                $table->decimal('revenue', 8, 2);
            });
        }
    }

    public function down()
    {
        Schema::dropIfExists('customers');
    }
}
