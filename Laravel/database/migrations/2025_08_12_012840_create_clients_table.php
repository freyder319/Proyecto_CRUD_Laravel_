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
        Schema::create('clients', function (Blueprint $table) {
            $table->id('ID_CLIENTE');
            $table->string('NOMBRE_CLIENTE', 50);
            $table->string('APELLIDO_CLIENTE', 50);
            $table->string('TELF_CLIENTE',15);
            $table->string('CORREO_CLIENTE', 255);
            $table->integer('NUM_DEUDAS',);
            $table->integer('NUM_COMPRAS');
            $table->string('ESTADO_CLIENTE', 100);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clients');
    }
};
