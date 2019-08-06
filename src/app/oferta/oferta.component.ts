import { Component, OnInit, Input, OnDestroy} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'
import { OfertasService } from '../ofertas.service'
import { Oferta } from '../shared/oferta.model';
import {CarrinhoService} from '../carrinho.service';

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
    private ofertasServices: OfertasService,
    private carrinhoService: CarrinhoService) { 
  }

  ngOnInit() {

    console.log('Carrinho Service', this.carrinhoService.exibirItens())

    this.route.params.subscribe((parametros: Params) =>{
      this.ofertasServices.getOfertaPorId(parametros.id)
      .then((oferta: Oferta) => {
        this.oferta = oferta
      })
      

    })
    
  }

       ngOnDestroy(){

       }

       adicionarItemCarrinho(oferta: Oferta): void{
        this.carrinhoService.incluirItem(this.oferta)
        console.log(this.carrinhoService.exibirItens())
       }
  }

  


