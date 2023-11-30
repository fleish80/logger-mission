import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country} from '../../models/country.model';

export const COUNTRIES_URL = 'https://restcountries.com/v3.1/name/';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  #http = inject(HttpClient);

  getCountries(name: string) {
    return this.#http.get<Country[]>(`${COUNTRIES_URL}${name}`);
  }
}
