<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = ['product_code', 'description', 'price', 'category_id'];
    public $timestamps = false;  // prevent automatically managing the created_at and updated_at
}
