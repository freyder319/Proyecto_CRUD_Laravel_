<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('product', function (Blueprint $table) {
            $table->id('CODIGO_PRODUCTO');
            $table->integer('ID_CATEGORIA');
            $table->string('DESCRIPCION_PRODUCTO', 500);
            $table->binary('IMG_PRODUCTO');
            $table->string('NOMBRE_PRODUCTO', 80);
            $table->integer('STOCK_PRODUCTO');
            $table->decimal('PRECIO_UNITARIO', 10, 0);
            $table->decimal('PRECIO_COMERCIAL', 10, 0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product');
    }
};
