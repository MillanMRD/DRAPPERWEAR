<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ImagenNoticia extends Model
{
    use HasFactory;

    protected $table = 'imagennoticias';

    // Asegúrate de tener las propiedades fillable para los campos que deseas asignar masivamente
    protected $fillable = [
        'id_noticia',
        'ruta',
    ];
}
