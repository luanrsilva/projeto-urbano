import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { SectorModel } from "../../models/sector.module";

@Injectable({
  providedIn: 'root'
})
export class SectorService {

  private baseUrl: string = `${environment.apiUrl}/api/sector/`;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private httpClient: HttpClient) { }

  save(newSector: SectorModel) {
    console.log(newSector)
    return this.httpClient.post(this.baseUrl, JSON.stringify(newSector), this.httpOptions);
  }

  getById(sectorId: string) {
    return this.httpClient.get(this.baseUrl + sectorId, this.httpOptions);
  }
}
