<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;

class OrderController extends Controller
{
    public function index() {
        $orders = Order::with('customer', 'orderItems.product')->get();
        return response()->json($orders);
    }

    public function store(Request $request) {
        $order = new Order;
        $order->fill($request->all());
        $order->save();

        $total = 0;
        foreach ($request->orderItems as $item) {
            $product = Product::find($item["product_id"]);
            if ($product === null) {
                return response()->json(["message" => "Product with id " + $item["product_id"] + " not found"], 404);
            }
            $orderItem = new OrderItem;
            $orderItem->fill($item);
            $orderItem->order_id = $order->id;
            $orderItem->unit_price = $product->price;
            $orderItem->total = $item["quantity"] * $product->price;
            $total += $orderItem->total;
            $orderItem->save();
        }

        $order->total = $total;
        $order->save();

        return response()->json($order->load('customer', 'orderItems.product'), 201);
    }

    public function show($id) {
        $order = Order::with('customer', 'orderItems.product')->find($id);

        if ($order === null) {
            return response()->json(["message" => "Order not found"], 404);
        }

        return response()->json($order);
    }

    public function update(Request $request, $id) {
        $order = Order::find($id);

        if ($order === null) {
            return response()->json(["message" => "Order not found"], 404);
        }

        $order->fill($request->all());
        $order->save();

        OrderItem::where('order_id', $order->id)->delete();

        $total = 0;
        foreach ($request->orderItems as $item) {
            $product = Product::find($item["product_id"]);
            if ($product === null) {
                return response()->json(["message" => "Product with id " + $item["product_id"] + " not found"], 404);
            }
            $orderItem = new OrderItem;
            $orderItem->fill($item);
            $orderItem->order_id = $order->id;
            $orderItem->unit_price = $product->price;
            $orderItem->total = $item["quantity"] * $product->price;
            $total += $orderItem->total;
            $orderItem->save();
        }

        $order->total = $total;
        $order->save();

        return response()->json($order->load('customer', 'orderItems.product'));
    }

    public function destroy($id) {
        $order = Order::find($id);

        if ($order === null) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        OrderItem::where('order_id', $order->id)->delete();
        $order->delete();

        return response()->json(['message' => 'Order deleted']);
    }
}
