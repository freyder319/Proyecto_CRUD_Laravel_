<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    protected $table = 'product'; 
    protected $primaryKey = 'CODIGO_PRODUCTO';
    public $timestamps = true; 
    protected $fillable = [
        'CODIGO_PRODUCTO',
        'ID_CATEGORIA',
        'DESCRIPCION_PRODUCTO',
        'IMG_PRODUCTO',
        'NOMBRE_PRODUCTO',
        'STOCK_PRODUCTO',
        'PRECIO_UNITARIO',
        'PRECIO_COMERCIAL'
    ];
}
