import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { NoticiaService } from '../noticia.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  id!: number;
  noticias!: any;
  public imgURL = `${environment.imgURL}/`;

  constructor(
    private route: ActivatedRoute,
    private noticiaService: NoticiaService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getNoticiaDetails();
  }

  goBack(): void {
    this.location.back();
  }

  getNoticiaDetails(): void {
    this.id = this.route.snapshot.params['idPerson'];
    this.noticiaService.find(this.id).subscribe((data: any) => {
      this.noticias = data;
    });
  }

}
