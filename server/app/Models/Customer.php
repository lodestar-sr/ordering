<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    protected $fillable = ['name', 'email'];
    public $timestamps = false;  // prevent automatically managing the created_at and updated_at

    // Each customer can have many orders
    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}
