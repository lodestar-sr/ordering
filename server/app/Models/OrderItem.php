<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    protected $fillable = ['order_id', 'product_id', 'quantity', 'unit_price'];
    public $timestamps = false;  // prevent automatically managing the created_at and updated_at

    // One order item belongs to one order
    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    // One order item belongs to one product
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
