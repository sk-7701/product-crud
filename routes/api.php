<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;

Route::middleware('auth:sanctum')->group( function () {
    Route::resource('products', ProductController::class);
    
});

Route::post('register',[AuthController::class,'register']);
Route::post('login',[AuthController::class,'login']);

