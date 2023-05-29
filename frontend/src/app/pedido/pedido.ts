export interface Pedido {
    Id_detalle: number;
    ID_pedido: number;
    ID_producto: number;
    Cantidad: number;
    Precio_unitario: number;
    enCache: boolean; // Nueva propiedad enCache
}
