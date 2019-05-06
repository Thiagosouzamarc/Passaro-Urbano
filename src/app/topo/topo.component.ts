import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.service'
import { Observable, Subject, of } from 'rxjs';
import { Oferta } from '../shared/oferta.model';
import { switchMap, debounceTime, distinctUntilChanged, catchError} from 'rxjs/operators';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [OfertasService]
})
export class TopoComponent implements OnInit {

  public ofertas: Observable<Oferta[]>
  private subjectPesquisa: Subject<string> = new Subject<string>()

  constructor(private ofertasService: OfertasService) { }

  ngOnInit() {            
    this.ofertas = this.subjectPesquisa.pipe( //retorno Oferta[]
      debounceTime(1000),  //executa a ação do switchMap após 1 segundo
      distinctUntilChanged(), // para fazer pesquisas distintas
      switchMap((termo: string) =>{

        if(termo.trim() === '')
        {
          //retornar observable de array de ofertas vazio
          return of<Oferta[]>([])
          
        }
        return this.ofertasService.pesquisaOfertas(termo)
      })
      )
        catchError((err: any) => {
          return of<Oferta[]>([])
        })
     
  }

  public pesquisa(termoDaBusca: string): void{
    console.log('keyup caracter: ', termoDaBusca)
    this.subjectPesquisa.next(termoDaBusca)
  }
  
  public limpaPesquisa(){
    this.subjectPesquisa.next('')
}
}
