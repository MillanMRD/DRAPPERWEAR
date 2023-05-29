import { Component, OnInit } from '@angular/core';
import { ICreateOrderRequest, IPayPalConfig } from "ngx-paypal";
import { environment } from 'src/environments/environment';
import { ProductoService } from '../producto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Producto } from '../producto';
import { StorageService } from '../../shared/storage.service';
import { AuthService } from './../../shared/auth.service';
import { TokenService } from '../../shared/token.service';
import { AuthStateService } from '../../shared/auth-state.service';
import { CartItemModel } from '../../models/cart-item-model';

@Component({
	selector: 'app-shopping',
	templateUrl: './shopping.component.html',
	styleUrls: ['./shopping.component.scss'],
	providers: [DatePipe]
})

export class ShoppingComponent implements OnInit {
	isSignedIn: boolean = false;
	id!: number;
	productos!: any;
	public form: FormGroup;
	public fecha: any = new Date();
	public fech: any;

	public payPalConfig?: IPayPalConfig;
	public showPaypalButtons!: boolean;
	public currency: string = "EUR";
	public quantity: string = "1";
	public price: string = "1.00";
	public description: string = "Enterprise Subscription";
	public qty = 2;
	public total = 0;
	public totalCompra = 0;
	public cartItems: any = [];
	public imgURL = `${environment.imgURL}/`;
	public lista: any = [];

	constructor(
		public productoService: ProductoService,
		private route: ActivatedRoute,
		private router: Router,
		private datePipe: DatePipe,
		private storageService: StorageService,
		private auth: AuthStateService,
		public token: TokenService,
		public authService: AuthService,
	) {
		this.fech = this.datePipe.transform(this.fecha, 'yyyy-MM-dd');

		this.form = new FormGroup({
			uid: new FormControl('', [Validators.required]),
			cantidad: new FormControl('1', [Validators.required]),
			precio: new FormControl('', [Validators.required]),
			currency_code: new FormControl('', [Validators.required]),
			talla: new FormControl('', [Validators.required]),
			descripcion: new FormControl('', [Validators.required]),
			direccion: new FormControl('', [Validators.required]),
			fecha: new FormControl(this.fech, [Validators.required]),
			nombre: new FormControl('', [Validators.required]),
			apellido: new FormControl('', [Validators.required]),
			email: new FormControl('', [Validators.required]),
			telefono: new FormControl('', [Validators.required]),
		});
	}

	ngOnInit(): void {
		this.auth.userAuthState.subscribe((val) => {
			this.isSignedIn = val;
		});
		this.id = this.route.snapshot.params['id'];
		this.productOne();
		this.paypal();

		if (this.storageService.existsCart()) {
			this.cartItems = this.storageService.getCart();
		}
	}

	productOne() {
		this.productoService.find(this.id).subscribe((data: any) => {
			this.productos = data;
			this.form.controls['precio'].setValue(data.Precio);
			this.form.controls['descripcion'].setValue(data.Nombre);
			this.form.controls['uid'].setValue(data.ID_Producto);
			this.form.controls['currency_code'].setValue(this.currency);
		});
	}

	private paypal(): void {

		this.payPalConfig = {
			currency: this.currency,
			clientId: `${environment.clientId}`,
			createOrderOnClient: (data) =>
				<ICreateOrderRequest>{
					intent: 'CAPTURE',
					purchase_units: [{
						amount: {
							currency_code: this.currency,
							value: this.total.toString(),
							breakdown: {
								item_total: {
									currency_code: this.currency,
									value: this.total.toString()
								}
							}
						},
						items: this.getItemsList()
					}]
				},
			advanced: {
				commit: "true"
			},
			style: {
				label: "paypal",
				layout: "vertical"
			},
			onApprove: (data: any, actions: any) => {
				console.log(
					"onApprove - la transacción fue aprobada, pero no autorizada",
					data,
					actions
				);
				actions.order.get().then((details: any) => {
					console.log(
						"onApprove - puede obtener detalles completos del pedido dentro de onApprove: ",
						details
					);
				});
			},
			onClientAuthorization: (data: any) => {
				console.log(
					"onClientAuthorization - probablemente debería informar a su servidor sobre la transacción completada en este punto",
					data
				);
				this.router.navigateByUrl('/');
			},
			onCancel: (data: any, actions: any) => {
				console.log("OnCancel", data, actions);
			},
			onError: (err: any) => {
				console.log("OnError", err);
			},
			onClick: (data: any, actions: any) => {
				console.log("onClick", data, actions);
			}
		};
	}

	getItemsList(): any[] {
		return this.lista;
	}

	addQty(): void {
		let cant = this.qty++;
		if (cant < 1) {
			this.qty = 2;
			this.form.controls['cantidad'].setValue(2);
		} else {
			this.form.controls['cantidad'].setValue(cant);
		}

	}

	restQty(): void {
		let cant = this.qty--;
		if (cant < 1) {
			this.form.controls['cantidad'].setValue(1);
		} else {
			this.form.controls['cantidad'].setValue(cant);
		}
	}


	submit() {

		if (this.form.valid) {

			let total = 0;
			total = this.form.value.cantidad * this.form.value.precio;
			this.totalCompra = +total.toFixed(2);

			this.productoService.shopping(this.form.value).subscribe(resp => {
				if (resp.code == 201) {

					this.showPaypalButtons = true;
					this.total = resp.data.total;
					this.lista = resp.data.items;




				} else {
					alert(resp.message);
				}
			})
		} else {
			alert("Formulario invalido");
		}
	}

	back() {
		this.showPaypalButtons = false;
	}

}
