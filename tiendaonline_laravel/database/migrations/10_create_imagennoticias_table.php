<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('imagennoticias', function (Blueprint $table) {
            $table->engine = 'InnoDB';

            $table->id('id');
            $table->unsignedBigInteger('id_noticia');
            $table->string('ruta');
            $table->timestamps();

            $table->foreign('id_noticia')->references('id')->on('noticias');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('imagennoticias');
    }
};
