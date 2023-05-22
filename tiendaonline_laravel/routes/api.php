<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductoController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::group([], function ($router) {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
});

Route::post('/producto/store', [ProductoController::class, 'store']);
Route::post('/producto/storeimagen', [ProductoController::class, 'storeImagen']);
Route::post('/producto/update/{id}', [ProductoController::class, 'update']);
Route::delete('/producto/destroy/{id}', [ProductoController::class, 'destroy']);
Route::get('/producto/index', [ProductoController::class, 'index']);
Route::get('/producto/indexImagen', [ProductoController::class, 'indexImagen']);
Route::get('/producto', [ProductoController::class, 'index']);
Route::get('/producto/show/{id}', [ProductoController::class, 'show']);
Route::post('/shopping/shopp', [ProductoController::class, 'shopp']);
