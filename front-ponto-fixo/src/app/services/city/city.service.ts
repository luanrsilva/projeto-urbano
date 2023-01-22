import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CityModel } from "../../models/city.model";

@Injectable({
  providedIn: 'root'
})
export class CityService {

  private baseUrl: string = `${environment.apiUrl}/api/city/`;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private httpClient: HttpClient
  ) { }

  save(newCity: CityModel) {
    return this.httpClient.post(this.baseUrl, JSON.stringify(newCity), this.httpOptions);
  }

  getCities() {
    return this.httpClient.get(this.baseUrl);
  }

  getById(cityId: string) {
    return this.httpClient.get(this.baseUrl + cityId, this.httpOptions);
  }

  getCitySectors(cityId: string) {
    return this.httpClient.get(this.baseUrl + cityId + '/sectors', this.httpOptions);
  }

  getCityProperties(cityId: string) {
    return this.httpClient.get(this.baseUrl + cityId + '/properties', this.httpOptions);
  }
}
