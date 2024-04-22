<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = ['customer_id'];
    public $timestamps = false;  // prevent automatically managing the created_at and updated_at

    // An order belongs to one customer
    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    // An order can contain many order items
    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }
}
