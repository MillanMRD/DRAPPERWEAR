import { Component, OnInit } from '@angular/core';
import { NoticiaService } from '../noticia.service';
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
    public noticiaService: NoticiaService,
    private router: Router,
    private http: HttpClient,
    public fb: FormBuilder,
  ) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      titulo: new FormControl('', [Validators.required]),
      cuerpo: new FormControl('', [Validators.required]),
      file: new FormControl(null, [Validators.required])
    })

  }

  get f() {
    return this.form.controls;
  }

  uploadFile(event: any) {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    this.form.patchValue({
      file: file
    });
  }

  submit() {

    let data: any = {
      titulo: this.form.value.titulo,
      cuerpo: this.form.value.cuerpo,
      file: this.form.value.file
    }

    this.noticiaService.create(data).subscribe(res => {
      if (res.body.code == 201) {
        console.log(res.body.message);
        this.router.navigateByUrl('noticia/index');
      } else {
        alert(res.body.message);
      }
    })
  }

}
