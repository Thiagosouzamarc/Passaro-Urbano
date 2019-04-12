import { Component, OnInit } from '@angular/core';
import { Oferta } from '../shared/oferta.model'
import { OfertasService } from '../ofertas.service'

@Component({
  selector: 'app-restaurante',
  templateUrl: './restaurante.component.html',
  styleUrls: ['./restaurante.component.css'],
  providers: [ OfertasService ]
})
export class RestauranteComponent implements OnInit {

  public ofertas: Oferta[]

  constructor(private ofertasServices: OfertasService) { }

  ngOnInit() {
    this.ofertasServices.getOfertasPorCategoria('restaurante')
    .then(( ofertas: Oferta[]) => {
      this.ofertas = ofertas
    })
  }

}
