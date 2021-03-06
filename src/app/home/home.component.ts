import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
//import { PDFJS } from 'pdfjs-dist';
import * as PDFJS from 'pdfjs-dist/build/pdf';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [OfertasService]
})
export class HomeComponent implements OnInit {

  form : FormGroup
  orders = [];
  imgSrc: string;
  imgWidth: number;
  imgHeight: number;
  errorMessage: string;

  public ofertas: Oferta[]

  constructor(private ofertasService: OfertasService,
              private formBuilder: FormBuilder) {
                this.form = this.formBuilder.group({
                  orders: new FormArray([])
                })
                this.orders = this.getOrders();
                this.addCheckboxes();
   }

   private addCheckboxes() {
    this.orders.map((o, i) => {
      const control = new FormControl(i === 0); // if first item set to true, else false
      (this.form.controls.orders as FormArray).push(control);
    });
  }

  getOrders() {
    return [
      { id: 100, name: 'order 1' },
      { id: 200, name: 'order 2' },
      { id: 300, name: 'order 3' },
      { id: 400, name: 'order 4' }
    ];
  }

  submit() {
    const selectedOrderIds = this.form.value.orders
      .map((v, i) => v ? this.orders[i].name : null)
      .filter(v => v !== null);
    console.log(selectedOrderIds);
  }

  ngOnInit() {
    //this.ofertas = this.ofertasService.getOfertas()
    //console.log(this.ofertas)

    this.ofertasService.getOfertas()
    .then(
      ( ofertas: Oferta[] ) => { this.ofertas = ofertas
       })
      .catch((param: any) => { 
      })
  }

  //@ViewChild('content') content: ElementRef;

  public downloadPdf(){

    var data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new PDFJS('p', 'mm', 'a4');
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('teste.pdf');
    })


    // let doc = new jsPDF();

    // let specialElementHandelers = {
    //   '#editor': function(element, renderer){
    //     return true;
    //   }
    // };

    // let content = this.content.nativeElement;

    // doc.fromHTML(content.innerHTML, 15, 15, {
    //   'width' : 190,
    //   'elementHandlers': specialElementHandelers
    // });

    // doc.save('test.pdf');

  }

}
