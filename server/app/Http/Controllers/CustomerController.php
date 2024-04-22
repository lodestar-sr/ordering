<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Customer;

class CustomerController extends Controller {
    public function index() {
        $customers = Customer::all();
        return response()->json($customers);
    }

    public function store(Request $request) {
        $customer = Customer::create($request->all());
        return response()->json($customer, 201);
    }

    public function show($id) {
        $customer = Customer::find($id);
        if ($customer) {
            return response()->json($customer);
        }

        return response()->json(['Message' => 'Customer not found']);
    }

    public function update(Request $request, $id) {
        $customer = Customer::find($id);
        if ($customer) {
            $customer->update($request->all());
            return response()->json($customer);
        }

        return response()->json(['Message' => 'Customer not found']);
    }

    public function destroy($id) {
        $customer = Customer::find($id);

        if ($customer) {
            $customer->delete();
            return response()->json(['Message' => 'Customer Deleted']);
        }

        return response()->json(['Message' => 'Customer not found']);
    }

}
