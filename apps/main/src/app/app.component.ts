import {Component, inject} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {LoggerService} from "@esquare-mission/logger";

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

  #loggerService = inject(LoggerService);

  constructor() {
    try {

      let arr: number[] | null = [];
      arr[10] = 5;
      arr = null;
      arr![10] = 5;
    } catch (error) {
      this.#loggerService.log(error as any)
    }
  }


}
