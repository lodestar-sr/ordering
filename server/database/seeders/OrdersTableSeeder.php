<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class OrdersTableSeeder extends Seeder
{
    public function run()
    {
        // Load all customers and product IDs (which are product_code in db) into a set for fast lookup
        $customers = DB::table('customers')->pluck('id')->all();
        $products = DB::table('products')->pluck('product_code')->all();

        // Get all order files
        $orderFiles = File::glob(database_path('data/order*.json'));

        foreach ($orderFiles as $orderFile) {
            $json = File::get($orderFile);

            $order = json_decode($json, true);

            // Check if customer exists
            if (!in_array($order['customer-id'], $customers)) {
                continue;
            }

            $orderData = [
                'customer_id' => $order['customer-id'],
                'total' => $order['total'],
            ];

            // Insert order and get new 'id'
            $newOrderId = DB::table('orders')->insertGetId($orderData);

            if (!empty($order['items'])) {
                foreach($order['items'] as $item) {

                    // Check if product exists
                    if (!in_array($item['product-id'], $products)) {
                        continue;
                    }

                    $orderItemData = [
                        'order_id' => $newOrderId, // use new 'order_id'
                        'product_id' => DB::table('products')->where('product_code', $item['product-id'])->value('id'),
                        'quantity' => $item['quantity'],
                        'unit_price' => $item['unit-price'],
                        'total' => $item['total'],
                    ];

                    DB::table('order_items')->insert($orderItemData);
                }
            }
        }
    }
}
