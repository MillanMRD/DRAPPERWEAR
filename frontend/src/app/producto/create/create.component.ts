import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../producto.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, NgForm, FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { throwError, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  form!: FormGroup;
  files!: File;

  constructor(
    public productoService: ProductoService,
    private router: Router,
    private http:HttpClient,
    public fb: FormBuilder,
  ) { }

  ngOnInit(): void {
 
    this.form = this.fb.group({
      Nombre: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+')]),
      Descripcion: new FormControl('', [Validators.required]),
      Precio: new FormControl('', [Validators.required]),
      Stock: new FormControl('', [Validators.required]),
      file: new FormControl(null, [Validators.required])
    })

  }

  get f() {
    return this.form.controls;
  }
  
  uploadFile(event:any) {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    this.form.patchValue({
      file: file
    });
  }

  submit() {

    let data:any = {
      nombre: this.form.value.Nombre,
      descripcion: this.form.value.Descripcion,
      precio: this.form.value.Precio,
      stock: this.form.value.Stock,
      file: this.form.value.file
    }

    this.productoService.create(data).subscribe(res => {
      if(res.body.code == 201){
        console.log(res.body.message);
        this.router.navigateByUrl('producto/index');
      }else{
        alert(res.body.message);
      }
    })
  }

}
