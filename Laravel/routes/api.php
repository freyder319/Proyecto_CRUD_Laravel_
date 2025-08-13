<?php
use App\Http\Controllers\Api\ClienteController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProductoController;

// API Routes Productos
Route::get('/productos', [ProductoController::class, 'index']);
Route::post('/productos', [ProductoController::class, 'store']);
Route::put('/productos/{id}', [ProductoController::class, 'update']);
Route::get('/productos/{id}', [ProductoController::class, 'show']);
Route::delete('/productos/{id}', [ProductoController::class, 'destroy']);

// API Routes Clientes
Route::get('/clientes', [ClienteController::class, 'index']);
Route::post('/clientes', [ClienteController::class, 'store']);
Route::put('/clientes/{id}', [ClienteController::class, 'update']);
Route::get('/clientes/{id}', [ClienteController::class, 'show']);
Route::delete('/clientes/{id}', [ClienteController::class, 'destroy']);