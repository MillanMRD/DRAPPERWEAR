<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ImagenProducto extends Model
{
    use HasFactory;

    protected $table = 'imagenproducto';

    // Asegúrate de tener las propiedades fillable para los campos que deseas asignar masivamente
    protected $fillable = [
        'id_producto',
        'ruta',
    ];
}
