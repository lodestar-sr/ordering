<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class CustomersTableSeeder extends Seeder
{
    public function run()
    {
        // Get the existing customer ids
        $existingCustomerNames = DB::table('customers')->pluck('name')->toArray();

        // Read JSON file
        $json = File::get("database/data/customers.json");

        // Decode JSON to array
        $customers = json_decode($json, true);

        // Prepare empty array for new customers
        $newCustomers = [];

        // Loop through each customer
        foreach ($customers as $customer) {

            // Skip existing customers
            if (in_array($customer['name'], $existingCustomerNames)) {
                continue;
            }

            $newCustomers[] = [
                'name' => $customer['name'],
                'since' => $customer['since'],
                'revenue' => $customer['revenue'],
            ];
        }

        DB::table('customers')->insert($newCustomers);
    }
}
