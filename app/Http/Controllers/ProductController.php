<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
class ProductController extends Controller
{
    public function index()
    {

        $data = Product::all();
        return response()->json($data);
    }

    //-------------------------
    public function store(Request $request)
    {
    
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'string',
            'price' => 'required|numeric',
            
        ]);


        // Handle the image upload
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $image_name = date('Y-m-d').$file->getClientOriginalName();
            $file->move(public_path('images'),$image_name);
        }

        // Create the product record
        $product = Product::create([
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'image' => $image_name ?? null,
        ]);

        return response()->json([
            'success' => true,
            'product' => $product
        ]);
    
    }

    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();
        return response()->json(['message' => 'Product deleted successfully']);
    }

}
