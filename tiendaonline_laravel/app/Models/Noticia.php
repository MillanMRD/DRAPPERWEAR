<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Noticia extends Model
{
    use HasFactory;

    protected $primaryKey = 'id';

    protected $fillable = [
        'titulo',
        'cuerpo',
    ];

    public function imagenesNoticias()
    {
        return $this->hasMany(ImagenProducto::class, 'id_noticia');
    }
}
