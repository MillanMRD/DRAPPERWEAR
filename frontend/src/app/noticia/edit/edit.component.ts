import { Component, OnInit } from '@angular/core';

import { NoticiaService } from '../noticia.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Noticia } from '../noticia';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  id!: number;
  noticia!: Noticia;
  form!: FormGroup;

  constructor(
    public noticiaService: NoticiaService,
    private route: ActivatedRoute,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['idPerson'];
    this.noticiaService.find(this.id).subscribe((data: Noticia) => {
      this.noticia = data;
      this.initializeForm();
    });
  }

  initializeForm() {
    this.form = new FormGroup({
      titulo: new FormControl(this.noticia.titulo, [Validators.required]),
      cuerpo: new FormControl(this.noticia.cuerpo, [Validators.required]),
      imagen: new FormControl(this.noticia.imagen, [Validators.required])
    });
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    console.log(this.form.value);
    this.noticiaService.update(this.id, this.form.value).subscribe(res => {
      console.log('Noticia updated successfully!');
      this.router.navigateByUrl('noticia/index');
    })
  }
}
