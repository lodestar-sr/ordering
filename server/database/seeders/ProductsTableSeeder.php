<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class ProductsTableSeeder extends Seeder
{
    public function run()
    {
        // Get the existing product ids
        $existingProductCodes = DB::table('products')->pluck('product_code')->toArray();

        $json = File::get("database/data/products.json");
        $products = json_decode($json, true);

        $newProducts = [];

        foreach ($products as $product) {

            // Skip existing products
            if (in_array($product['id'], $existingProductCodes)) {
                continue;
            }

            $newProducts[] = [
                'product_code' => $product['id'],
                'description' => $product['description'],
                'category_id' => $product['category'],
                'price' => $product['price'],
            ];
        }
        DB::table('products')->insert($newProducts);
    }
}
