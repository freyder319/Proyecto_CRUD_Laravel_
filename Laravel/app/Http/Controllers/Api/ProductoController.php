<?php

namespace App\Http\Controllers\Api;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Product;
class ProductoController extends Controller
{
public function store(Request $request)
{
$validator = Validator::make($request->all(), [
    'CODIGO_PRODUCTO' => 'required|integer',
    'ID_CATEGORIA' => 'required|integer',
    'DESCRIPCION_PRODUCTO' => 'required|string|max:500',
    'IMG_PRODUCTO' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
    'NOMBRE_PRODUCTO' => 'required|string|max:80',
    'STOCK_PRODUCTO' => 'required|integer',
    'PRECIO_UNITARIO' => 'required|numeric',
    'PRECIO_COMERCIAL' => 'required|numeric'
]);


    if ($validator->fails()) {
        return response()->json([
            'errors' => $validator->errors()
        ], 422);
    }

    $imagePath = $request->file('IMG_PRODUCTO')->store('productos', 'public');

    $producto = Product::create([
        'CODIGO_PRODUCTO' => $request->CODIGO_PRODUCTO,
        'ID_CATEGORIA' => $request->ID_CATEGORIA,
        'DESCRIPCION_PRODUCTO' => $request->DESCRIPCION_PRODUCTO,
        'IMG_PRODUCTO' => $imagePath,
        'NOMBRE_PRODUCTO' => $request->NOMBRE_PRODUCTO,
        'STOCK_PRODUCTO' => $request->STOCK_PRODUCTO,
        'PRECIO_UNITARIO' => $request->PRECIO_UNITARIO,
        'PRECIO_COMERCIAL' => $request->PRECIO_COMERCIAL
    ]);

    return response()->json([
        'message' => 'Producto creado correctamente',
        'data' => $producto
    ], 201);
}
public function index()
{
    $productos = Product::all();

    return response()->json($productos);
}
public function update(Request $request, $id)
{
    $producto = Product::find($id);

    if (!$producto) {
        return response()->json(['error' => 'Producto no encontrado'], 404);
    }

    // Validación
    $validator = Validator::make($request->all(), [
        'ID_CATEGORIA' => 'required|integer',
        'DESCRIPCION_PRODUCTO' => 'required|string|max:500',
        'NOMBRE_PRODUCTO' => 'required|string|max:80',
        'STOCK_PRODUCTO' => 'required|integer',
        'PRECIO_UNITARIO' => 'required|numeric',
        'PRECIO_COMERCIAL' => 'required|numeric',
        'IMG_PRODUCTO' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
    ]);

    if ($validator->fails()) {
        return response()->json(['errors' => $validator->errors()], 422);
    }

    $data = $request->except(['IMG_PRODUCTO']);

    if ($request->hasFile('IMG_PRODUCTO')) {
        $imagePath = $request->file('IMG_PRODUCTO')->store('productos', 'public');
        $data['IMG_PRODUCTO'] = $imagePath;
    }

    $producto->update($data);

    return response()->json([
        'mensaje' => 'Producto actualizado correctamente',
        'data' => $producto
    ], 200);
}


public function show($id)
{
    $producto = Product::find($id);

    if (!$producto) {
        return response()->json(['error' => 'Producto no encontrado'], 404);
    }
    // Generar la URL pública
    $producto->IMG_URL = asset('storage/' . $producto->IMG_PRODUCTO);
    return response()->json($producto);
}
public function destroy($id)
{
    $producto = Product::find($id);

    if (!$producto) {
        return response()->json(['message' => 'Producto no encontrado'], 404);
    }

    try {
        $producto->delete();
        return response()->json(['message' => 'Producto eliminado correctamente'], 200);
    } catch (\Exception $e) {
        return response()->json(['message' => 'Error al eliminar el producto', 'error' => $e->getMessage()], 500);
    }
}

}
