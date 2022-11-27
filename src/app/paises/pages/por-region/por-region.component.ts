import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [
    `
      button {
        margin-right: 5px;
      }
    `,
  ],
})
export class PorRegionComponent implements OnInit {
  regiones: string[] = [
    'EU',
    'EFTA',
    'CARICOM',
    'PA',
    'AU',
    'USAN',
    'EEU',
    'AL',
    'ASEAN',
    'CAIS',
    'CEFTA',
    'NAFTA',
    'SAARC',
  ];
  regionActiva: string = '';
  allPaises: Country[] = [];
  termino: string = '';
  hayError: boolean = false;

  constructor(private paisService: PaisService) {}

  getClassCSS(region: string) {
    return region === this.regionActiva
      ? 'btn btn-primary'
      : 'btn btn-outline-primary';
  }

  activarRegion(region: string) {
    if (region === this.regionActiva) return;

    this.regionActiva = region;
    this.allPaises = [];
    this.hayError = false;
    this.paisService.buscarPorRegion(region).subscribe({
      next: (paises) => {
        // console.log(paises);
        this.allPaises = paises;
        console.log('ALL PAISES=>', this.allPaises);
      },
      error: (err) => {
        console.log(err);
        this.hayError = true;
        this.allPaises = [];
      },
    });
  }

  ngOnInit(): void {}
}
