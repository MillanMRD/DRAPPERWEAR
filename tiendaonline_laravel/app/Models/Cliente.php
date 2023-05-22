<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    use HasFactory;

    protected $table = 'clientes';

    protected $primaryKey = 'Id_cliente';

    protected $dates = [
        'created_at',
        'updated_at',
    ];

    protected $fillable = [
        'Nombre',
        'Apellido',
        'Email',
        'Direccion',
        'Telefono'
    ];

}
