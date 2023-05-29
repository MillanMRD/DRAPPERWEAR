<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetallePedido extends Model
{
    protected $table = 'detalle_pedidos'; // Nombre de la tabla

    protected $primaryKey = 'Id_detalle'; // Nombre de la clave primaria

    protected $fillable = [
        'ID_pedido',
        'ID_producto',
        'Cantidad',
        'Precio_unitario',
    ];

    public function pedido()
    {
        return $this->belongsTo(Pedido::class, 'ID_pedido', 'Id_pedido');
    }

    public function producto()
    {
        return $this->belongsTo(Producto::class, 'ID_producto', 'ID_Producto');
    }
}
