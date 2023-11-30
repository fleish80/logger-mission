import { Injectable, inject } from '@angular/core';
import { CountriesService } from '../countries/countries.service';
import { Country } from '../../models/country.model';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { HttpErrorResponse } from '@angular/common/http';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';

type State = {
  countries: Country[],
  loading: boolean;
  loaded: boolean;
  error: HttpErrorResponse | null
}

@Injectable({
  providedIn: 'root'
})
export class CountriesStoreService extends signalStore(
  withState<State>({
    countries: [],
    loading: false,
    loaded: false,
    error: null
  }),
  withMethods((store, countriesService = inject(CountriesService)) => ({

    load: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { loading: true })),
        switchMap(name => countriesService.getCountries(name).pipe(
          tapResponse({
            next: (countries) => patchState(store, {
              countries,
              loading: false,
              loaded: true,
              error: null
            }),
            error: (error: HttpErrorResponse) => {
              patchState(store, {
                countries: [],
                loading: false,
                loaded: true,
                error
              })
            }
          })
        ))))
  }))
) {
}
