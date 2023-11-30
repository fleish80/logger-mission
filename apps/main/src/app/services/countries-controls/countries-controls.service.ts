import {inject, Injectable} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {FormControl} from '@angular/forms';
import {skipWhile} from 'rxjs';
import {CountriesStoreService} from '../countries-store/countries-store.service';

@Injectable({
  providedIn: 'root'
})
export class CountriesControlsService {

  nameCtrl = new FormControl('', { nonNullable: true });
  #countriesStoreService = inject(CountriesStoreService);

  constructor() {
    this.nameCtrl.valueChanges
      .pipe(
        skipWhile(name => name.length < 2),
        takeUntilDestroyed())
      .subscribe(name => {
        this.#countriesStoreService.load(name);
      })
  }
}
