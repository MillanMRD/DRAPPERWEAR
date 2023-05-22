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
        Schema::create('detalle_pedidos', function (Blueprint $table) {
            $table->id('Id_detalle');
            $table->unsignedBigInteger('ID_pedido');
            $table->unsignedBigInteger('ID_producto');
            $table->integer('Cantidad');
            $table->double('Precio_unitario', 8, 2);
            $table->timestamps();
            $table->foreign('ID_pedido')->references('Id_pedido')->on('pedidos');
            $table->foreign('ID_producto')->references('ID_Producto')->on('productos');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('detallePedidos');
    }
};
