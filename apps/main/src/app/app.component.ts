import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';

@Component({
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule, RouterLink, MatButtonModule, RouterLinkActive],
  selector: 'df-root',
  template: `

    <mat-toolbar color="primary">
      <a routerLink="countries" routerLinkActive="active" mat-flat-button color="primary">Countries</a>
    </mat-toolbar>
    <router-outlet/>
  `
})
export class AppComponent {

}
