import { Component, OnInit, Input, OnDestroy} from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { OfertasService } from '../ofertas.service'
import { Oferta } from '../shared/oferta.model';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [OfertasService]
})
export class OfertaComponent implements OnInit, OnDestroy {

  public oferta: Oferta

  constructor(
    private route: ActivatedRoute,
    private ofertasServices: OfertasService) { 
  }

  ngOnInit() {
    this.ofertasServices.getOfertaPorId(this.route.snapshot.params['id'])
    .then((oferta: Oferta) => {
      this.oferta = oferta
    })
    
  }

       ngOnDestroy(){

       }
  }

  


