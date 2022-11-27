import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
    `
      li {
        cursor: pointer;
      }
    `,
  ],
})
export class PorPaisComponent {
  termino: string = '';
  hayError: boolean = false;
  paises: Country[] = [];
  paisesSugeridos: Country[] = [];
  mostrarSugerencias: boolean = false;

  constructor(private paisService: PaisService) {}

  buscar(termino: string) {
    this.termino = termino;
    this.hayError = false;
    this.mostrarSugerencias = false;

    this.paisService.buscarPais(this.termino).subscribe({
      next: (searchpais) => {
        // console.log(searchpais);
        this.paises = searchpais;
      },
      error: (err) => {
        console.log(err);
        this.hayError = true;
        this.paises = [];
      },
    });
  }

  sugerencias(termino: string) {
    this.termino = termino;
    this.hayError = false;
    this.mostrarSugerencias = true;
    this.paisService.buscarPais(termino).subscribe({
      next: (searchpais) => {
        // console.log(searchpais);
        this.paisesSugeridos = searchpais.splice(0, 5);
        // console.log('PAISES SUGERIDOS', this.paisesSugeridos);
      },
      error: (err) => {
        console.log(err);
        this.hayError = true;
        this.paisesSugeridos = [];
      },
    });
  }

  buscarSugeridos(termino: string) {
    this.buscar(termino);
  }
}
