<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Clients extends Model
{
    protected $table = 'clients'; 
    protected $primaryKey = 'ID_CLIENTE';
    public $timestamps = true; 
    protected $fillable = [
        'ID_CLIENTE',
        'NOMBRE_CLIENTE',
        'APELLIDO_CLIENTE',
        'TELF_CLIENTE',
        'CORREO_CLIENTE',
        'NUM_DEUDAS',
        'NUM_COMPRAS',
        'ESTADO_CLIENTE',
    ];
}
