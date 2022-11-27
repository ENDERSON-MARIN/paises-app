import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Country } from '../interfaces/pais.interface';

@Injectable({
  providedIn: 'root',
})
export class PaisService {
  private apiUrl: string = 'https://restcountries.com/v2';

  get httpParams() {
    return new HttpParams().set(
      'fields',
      'name,capital,alpha2Code,flag,population'
    );
  }

  constructor(private http: HttpClient) {}

  /* https://restcountries.com/v3.1/name/venezuela */
  buscarPais(termino: string): Observable<Country[]> {
    const url = `${this.apiUrl}/name/${termino}`;
    return this.http.get<Country[]>(url, { params: this.httpParams });
  }

  /* https://restcountries.com/v2/capital/caracas */
  buscarPorCapital(termino: string): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${termino}`;
    return this.http.get<Country[]>(url, { params: this.httpParams });
  }

  /* https://restcountries.com/v2/alpha/ven */
  getCountryByCode(id: string): Observable<Country> {
    const url = `${this.apiUrl}/alpha/${id}`;
    return this.http.get<Country>(url);
  }

  /* https://restcountries.com/v2/regionalbloc/eu */
  buscarPorRegion(region: string): Observable<Country[]> {
    const url = `${this.apiUrl}/regionalbloc/${region}`;
    return this.http
      .get<Country[]>(url, { params: this.httpParams })
      .pipe(tap(console.log));
  }
}
