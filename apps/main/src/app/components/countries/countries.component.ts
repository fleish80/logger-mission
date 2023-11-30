import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CountriesControlsService } from '../../services/countries-controls/countries-controls.service';
import { CountriesStoreService } from '../../services/countries-store/countries-store.service';
import { CountriesTableComponent } from '../countries-table/countries-table.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'df-countries',
  standalone: true,
  imports: [MatFormFieldModule, JsonPipe, MatInputModule, ReactiveFormsModule, CountriesTableComponent, MatProgressSpinnerModule],
  template: `
  <mat-form-field appearance="outline">
    <mat-label>Countries</mat-label>
    <input matInput [formControl]="nameCtrl">
  </mat-form-field>
  
  @if (loaded()) {
    @if (loading()) {
      <mat-spinner/>
    }
    @else if (error()) {
      <span>{{error()!.message}}</span>
    } @else {
      <df-countries-table [countries]="countries()"/>
    } 
  }


  `,
  styles: `
    :host {
        padding-block-start: 50px;
        display: flex;
        align-items: center;
        flex-direction: column;
        padding-inline: 10px;
      }

  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CountriesComponent {

  #countriesStoreService = inject(CountriesStoreService);
  countries = this.#countriesStoreService.countries;
  loaded = this.#countriesStoreService.loaded;
  loading = this.#countriesStoreService.loading;
  error = this.#countriesStoreService.error;
  #countriesControlsService = inject(CountriesControlsService);
  nameCtrl = this.#countriesControlsService.nameCtrl;

}
