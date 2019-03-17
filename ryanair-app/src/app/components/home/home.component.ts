import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { IAirports } from 'src/app/interfaces/airports.interface';
import { Autocomplete } from 'src/app/services/autocomplete.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLoading: boolean;
  hasFligth: boolean;
  noFligthsMach: boolean;
  airportControl = new FormControl();
  iataControl = new FormControl();
  airports: IAirports[];
  airNames: string[];
  routes: string[];
  subscription: Subscription;

  constructor(

    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private _autompleteService: Autocomplete) {

    this.matIconRegistry
      .addSvgIcon('iata',
        this.domSanitizer.bypassSecurityTrustResourceUrl('../../../assets/img/iata.svg')
      );
    this.matIconRegistry
      .addSvgIcon('departure',
        this.domSanitizer.bypassSecurityTrustResourceUrl('../../../assets/img/departure.svg')
      );

    this.isLoading = false;
    this.hasFligth = false;
    this.noFligthsMach = false;
    this.airNames = [];

  }

  // load the info from service
  loadData(query: string, departure?: string) {

    if (query.length > 2) {

      this.isLoading = true;
      this.hasFligth = false;
      this.noFligthsMach = false;
      this.airNames = [];

      this.subscription = this._autompleteService.getAirports(query, departure)

        .subscribe((airports) => {

          if (!airports || airports.length === 0) {

            this.airNames = [];
            if (departure !== undefined) {
              this.noFligthsMach = true;
              this.hasFligth = false;
            }

          } else {

            this.airNames = [];

            airports.map(air => {
              this.airNames.push(air.name);
            });

            if (departure !== undefined) {
              this.noFligthsMach = false;
              this.hasFligth = true;
            }

          }

          this.isLoading = false;

        });

    } else {

      this.airNames = [];
      this.isLoading = false;
    }
  }

  ngOnInit() { }

  getUnsubscribed() {
    if (this.isLoading) {
      this.subscription.unsubscribe();
    }
  }


}
