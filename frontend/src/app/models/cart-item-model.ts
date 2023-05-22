import { Producto } from '../producto/producto';

export class CartItemModel {
    productId: number;
    productName: string;
    productPrice: number;
    qty: number;

    constructor(product: Producto) {
        this.productId = product.ID_Producto;
        this.productName = product.Nombre;
        this.productPrice = product.Precio;
        this.qty = 1;
    }
}
