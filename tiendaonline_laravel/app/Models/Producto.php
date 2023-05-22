<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    use HasFactory;
    protected $primaryKey = 'ID_Producto';

    protected $fillable = [
        'Nombre',
        'Descripcion',
        'Precio',
        'Stock',
    ];

    public function imagenesProductos()
    {
        return $this->hasMany(ImagenProducto::class, 'id_producto');
    }
}
