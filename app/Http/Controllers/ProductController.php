<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
class ProductController extends Controller
{
    public function index()
    {

        $data = Product::orderBy('created_at', 'desc')->get();
        return response()->json($data);
    }

    //-------------------------

    public function store(Request $request)
    {
    
        $request->validate([

            'name' => 'required|string|max:100',
            'description' => 'string|required|max:250',
            'price' => 'required|numeric|regex:/^\d{1,8}(\.\d{1,2})?$/',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
            
        ]);


        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $image_name = date('Y-m-d').$file->getClientOriginalName();
            $file->move(public_path('images'),$image_name);
        }


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
            
            
        ]);
        
        $image_name = '';
         if ($request->hasFile('image')) {
            
            $file = $request->file('image');
            $image_name = date('Y-m-d').$file->getClientOriginalName();
            $file->move(public_path('images'),$image_name);
        }

    
        $product = Product::find($id);
        
        $product->name = $request->name;
        $product->description = $request->description;
        $product->price = $request->price;
        
       if($image_name)
       {
        $product->image = $image_name;
       }
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
