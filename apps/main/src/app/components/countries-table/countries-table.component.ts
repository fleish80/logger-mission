import { DecimalPipe, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Country } from '../../models/country.model';

@Component({
  selector: 'df-countries-table',
  standalone: true,
  imports: [MatTableModule, DecimalPipe, NgOptimizedImage, MatIconModule],
  template: `
    <table mat-table [dataSource]="countries" class="mat-elevation-z8">
  <ng-container matColumnDef="name">
    <th mat-header-cell *matHeaderCellDef>Name</th>
    <td mat-cell *matCellDef="let element"> {{element.name.common}} </td>
  </ng-container>
  <ng-container matColumnDef="official">
    <th mat-header-cell *matHeaderCellDef>Official</th>
    <td mat-cell *matCellDef="let element"> {{element.name.official}} </td>
  </ng-container>
  <ng-container matColumnDef="capital">
    <th mat-header-cell *matHeaderCellDef>Capital</th>
    <td mat-cell *matCellDef="let element"> {{element.capital}} </td>
  </ng-container>
  <ng-container matColumnDef="region">
    <th mat-header-cell *matHeaderCellDef>Region</th>
    <td mat-cell *matCellDef="let element"> {{element.region}} </td>
  </ng-container>
  <ng-container matColumnDef="subregion">
    <th mat-header-cell *matHeaderCellDef>Subregion</th>
    <td mat-cell *matCellDef="let element"> {{element.subregion}} </td>
  </ng-container>
  <ng-container matColumnDef="population">
    <th mat-header-cell *matHeaderCellDef>Population</th>
    <td mat-cell *matCellDef="let element"> {{element.population | number}} </td>
  </ng-container>
  <ng-container matColumnDef="fifa">
    <th mat-header-cell *matHeaderCellDef>Fifa</th>
    <td mat-cell *matCellDef="let element"> {{element.fifa}} </td>
  </ng-container>
  <ng-container matColumnDef="flag">
    <th mat-header-cell *matHeaderCellDef>Flag</th>
    <td mat-cell *matCellDef="let element"><img  [ngSrc]="element.flags.svg" width="40" height="29"/> </td>
  </ng-container>
  <ng-container matColumnDef="coatOfArms">
    <th mat-header-cell *matHeaderCellDef>Symbol</th>
    <td mat-cell *matCellDef="let element">
      @if (element.coatOfArms.svg) {
        <img [ngSrc]="element.coatOfArms.svg" width="60" height="29"/>
      }
    </td>
  </ng-container>
  <ng-container matColumnDef="independent">
    <th mat-header-cell *matHeaderCellDef>Independent</th>
    <td mat-cell *matCellDef="let element">
      @if(element.independent) {
        <mat-icon class="yes">done</mat-icon>
      } @else {
        <mat-icon class="no">close</mat-icon>
      }
    </td>
  </ng-container>
  <ng-container matColumnDef="unMember">
    <th mat-header-cell *matHeaderCellDef>UN Member</th>
    <td mat-cell *matCellDef="let element">
      @if(element.unMember) {
        <mat-icon class="yes">done</mat-icon>
      } @else {
        <mat-icon class="no">close</mat-icon>
      }
    </td>
  </ng-container>
  <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
  <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
  </table>
  `,
  styles: `
  
    :host {
      display: flex;
      width: 100%;
    }

    .yes {
        color: green;
      }

    .no {
      color: red;
     }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountriesTableComponent {
  @Input({ required: true }) countries: Country[];
  displayedColumns = ['name', 'official', 'capital', 'region', 'subregion', 'population', 'fifa', 'flag', 'coatOfArms', 'independent', 'unMember'];

}
