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
            'description' => 'string|required',
            'price' => 'required|numeric',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
            
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


    //---------------------------------------------

    public function update(Request $request,$id)
    {

        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'string|required',
            'price' => 'required|numeric',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
            
        ]);
       
         if ($request->hasFile('image')) {
            $file = $request->file('image');
            $image_name = date('Y-m-d').$file->getClientOriginalName();
            $file->move(public_path('images'),$image_name);
        }

        $product = Product::find($id);
        
        $product->name = $request->name;
        $product->description = $request->description;
        $product->price = $request->price;
        $product->image = $image_name ?? null;
        $product->save();
        return response()->json([
            'success' => true,
            'product' => $product
        ]);


    }


    //-------------------------------------------------

    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();
        return response()->json(['message' => 'Product deleted successfully']);
    }

    //---------------------------------------------------





}
