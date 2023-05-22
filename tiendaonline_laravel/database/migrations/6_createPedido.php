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
        Schema::create('pedidos', function (Blueprint $table) {
            $table->id('Id_pedido');
            $table->date('fecha');
            $table->unsignedBigInteger('ID_cliente');
            $table->double('Total', 8, 2);
            $table->timestamps();
            $table->foreign('ID_cliente')->references('Id_cliente')->on('clientes');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pedidos');
    }
};
