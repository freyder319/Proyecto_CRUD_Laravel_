<?php

namespace App\Http\Controllers\Api;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Clients;

class ClienteController extends Controller
{
    public function store(Request $request){
        $validator = Validator::make($request->all(), [
            'NOMBRE_CLIENTE' => 'required|string|max:50',
            'APELLIDO_CLIENTE' => 'required|string|max:50',
            'TELF_CLIENTE' => 'required|integer',
            'CORREO_CLIENTE' => 'required|string|max:255',
            'NUM_DEUDAS' => 'required|integer',
            'NUM_COMPRAS' => 'required|integer',
            'ESTADO_CLIENTE' => 'required|string|max:100'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        $cliente = Clients::create([
            'NOMBRE_CLIENTE' => $request->NOMBRE_CLIENTE,
            'APELLIDO_CLIENTE' => $request->APELLIDO_CLIENTE,
            'TELF_CLIENTE' => $request->TELF_CLIENTE,
            'CORREO_CLIENTE' => $request->CORREO_CLIENTE,
            'NUM_DEUDAS' => $request->NUM_DEUDAS,
            'NUM_COMPRAS' => $request->NUM_COMPRAS,
            'ESTADO_CLIENTE' => $request->ESTADO_CLIENTE
        ]);

        return response()->json([
            'message' => 'Cliente creado correctamente',
            'data' => $cliente
        ], 201);
    }

    public function index(){
        $clientes = Clients::all();
        return response()->json($clientes);
    }

    public function update(Request $request, $id){
        $cliente = Clients::find($id);

        if (!$cliente) {
            return response()->json(['error' => 'Cliente no encontrado'], 404);
        }

        $validator = Validator::make($request->all(), [
            'NOMBRE_CLIENTE' => 'required|string|max:50',
            'APELLIDO_CLIENTE' => 'required|string|max:50',
            'TELF_CLIENTE' => 'required|integer',
            'CORREO_CLIENTE' => 'required|string|max:255',
            'NUM_DEUDAS' => 'required|integer',
            'NUM_COMPRAS' => 'required|integer',
            'ESTADO_CLIENTE' => 'required|string|max:100'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $cliente->update([
            'NOMBRE_CLIENTE' => $request->NOMBRE_CLIENTE,
            'APELLIDO_CLIENTE' => $request->APELLIDO_CLIENTE,
            'TELF_CLIENTE' => $request->TELF_CLIENTE,
            'CORREO_CLIENTE' => $request->CORREO_CLIENTE,
            'NUM_DEUDAS' => $request->NUM_DEUDAS,
            'NUM_COMPRAS' => $request->NUM_COMPRAS,
            'ESTADO_CLIENTE' => $request->ESTADO_CLIENTE
        ]);

        return response()->json([
            'mensaje' => 'Cliente actualizado correctamente',
            'data' => $cliente
        ], 200);
    }

    public function show($id){
        $cliente = Clients::find($id);

        if (!$cliente) {
            return response()->json(['error' => 'Cliente no encontrado'], 404);
        }
        return response()->json($cliente);
    }

    public function destroy($id){
        $cliente = Clients::find($id);

        if (!$cliente) {
            return response()->json(['message' => 'Cliente no encontrado'], 404);
        }

        try {
            $cliente->delete();
            return response()->json(['message' => 'Cliente eliminado correctamente'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error al eliminar el Cliente', 'error' => $e->getMessage()], 500);
        }
    }
}
