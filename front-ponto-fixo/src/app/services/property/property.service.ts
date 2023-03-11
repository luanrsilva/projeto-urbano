import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { PropertyModel } from "../../models/property.model";

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  private baseUrl: string = `${environment.apiUrl}/api/property/`;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private httpClient: HttpClient
  ) { }

  save(newProperty: PropertyModel) {
    console.log('NOVO', newProperty)
    return this.httpClient.post(this.baseUrl, JSON.stringify(newProperty), this.httpOptions);
  }
}
