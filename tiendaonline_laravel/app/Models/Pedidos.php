<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pedidos extends Model
{
    use HasFactory;

    protected $table = 'pedidos';

    protected $primaryKey = 'Id_pedido';

    protected $dates = [
        'created_at',
        'updated_at',
    ];

    protected $fillable = [
        'fecha',
        'ID_cliente',
        'Total'
    ];

    
}
