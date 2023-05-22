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
        Schema::create('imagenProducto', function (Blueprint $table) {
            $table->engine = 'InnoDB';

            $table->id('id');
            $table->unsignedBigInteger('id_producto');
            $table->string('ruta');
            $table->timestamps();

            $table->foreign('id_producto')->references('ID_Producto')->on('productos');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('imagenProducto');
    }
};
