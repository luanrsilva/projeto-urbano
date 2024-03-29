import { Component, OnInit } from '@angular/core';
import {CityModel} from "../../../models/city.model";
import {Router} from "@angular/router";
import { CityService } from "../../../services/city/city.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.scss']
})
export class CityListComponent implements OnInit {
  cities: CityModel[] = [];

  constructor(
    private router: Router,
    private cityService: CityService,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.loadCities();
  }

  hasPermission() {

  }

  loadCities() {
    this.cityService.getCities().subscribe({
      next: (response) => {
        const res = JSON.parse(JSON.stringify(response));
        this.cities = res.data;
        console.log(this.cities)
      },
      error: err => {
        this.toastrService.error(err.error.message, 'ERRO');
      }
    });
  }

  goToAddCity() {
    this.router.navigate(['/cities/new'])
  }

  goToCityDetail(id: string) {
    this.router.navigate(['/cities/'+ `${id}`])
  }

  getDate(date: Date) {
    console.log(typeof date)
    return date.getDate();
  }
}
