<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\NoticiaController;
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
    Route::post('/update/{id}', [AuthController::class, 'editUser']);
    Route::delete('/destroy/{id}', [AuthController::class, 'deleteUser']);
    Route::get('/index', [AuthController::class, 'getAllUsers']);
});

Route::post('/producto/store', [ProductoController::class, 'store']);
Route::post('/producto/update/{id}', [ProductoController::class, 'update']);
Route::delete('/producto/destroy/{id}', [ProductoController::class, 'destroy']);
Route::get('/producto/index', [ProductoController::class, 'index']);
Route::get('/producto', [ProductoController::class, 'index']);
Route::get('/producto/show/{id}', [ProductoController::class, 'show']);

Route::post('/noticia/store', [NoticiaController::class, 'store']);
Route::post('/noticia/update/{id}', [NoticiaController::class, 'update']);
Route::delete('/noticia/destroy/{id}', [NoticiaController::class, 'destroy']);
Route::get('/noticia/index', [NoticiaController::class, 'index']);
Route::get('/noticia', [NoticiaController::class, 'index']);
Route::get('/noticia/show/{id}', [NoticiaController::class, 'show']);

Route::post('/shopping/shopp', [ProductoController::class, 'shopp']);

Route::get('/pedido/index', [ProductoController::class, 'mostrarDatosDetallePedidos']);
