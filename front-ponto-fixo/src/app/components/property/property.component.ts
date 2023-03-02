import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { PropertyService } from "../../services/property/property.service";
import { PropertyModel } from "../../models/property.model";
import { SectorModel } from "../../models/sector.module";
import { CityService } from "../../services/city/city.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss']
})
export class PropertyComponent implements OnInit {
  formGroup: any;
  properties: any;
  private activeTab: any;
  private property!: PropertyModel;
  sectors!: SectorModel[];
  private cityId!: string;

  constructor(
    private fb: FormBuilder,
    private toastrService: ToastrService,
    private propertyService: PropertyService,
    private cityService: CityService,
    public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.buildForm();
    this.setPage();
    this.loadProperties();
    this.loadSectors();
  }

  private setPage() {
    this.property = new PropertyModel();
    this.route.url.subscribe(params => {
      if (!params) return;
      this.cityId = params[1].path;
    });
  }

  private buildForm() {
    this.formGroup = this.fb.group({
      identifier: ['', [Validators.required]],
      houseNumber: ['', []],
      landArea: ['', []],
      buildingArea: ['', []],
      ownerName: ['', []],
      ownerCPF: ['', []],
      sector: ['',[Validators.required]]
    });
  }

  setActiveTab(tab: 'LIST' | 'NEW') {
    this.activeTab = tab;
  }

  isActiveTab(tab: 'LIST' | 'NEW'): boolean {
    if(!this.activeTab) {
      this.activeTab = tab;
      return this.activeTab === tab;
    }
    return this.activeTab === tab;
  }

  saveProperty() {
    this.buildProperty();
    this.propertyService.save(this.property).subscribe({
      next: (response) => {
        const res = JSON.parse(JSON.stringify(response));
        this.toastrService.success(res.message,'SUCESSO');
      },
      error: err => {
        this.toastrService.error(err.error.message, 'ERRO');
      }
    })
  }

  private buildProperty() {
    this.property.identifier = this.formGroup.get('identifier')?.value;
    this.property.houseNumber = this.formGroup.get('houseNumber')?.value;
    this.property.landArea = this.formGroup.get('landArea')?.value;
    this.property.buildingArea = this.formGroup.get('buildingArea')?.value;
    this.property.ownerName = this.formGroup.get('ownerName')?.value;
    this.property.ownerCPF = this.formGroup.get('ownerCPF')?.value;
    this.property.sectorId = this.formGroup.get('sector')?.value;
    this.property.cityId = this.cityId;
  }

  private loadSectors() {
    this.cityService.getCitySectors(this.cityId).subscribe({
      next: (response) => {
        const res = JSON.parse(JSON.stringify(response));
        this.sectors = res.data.sectors;
      },
      error: err => {
        this.toastrService.error(err.error.message, 'ERRO');
      }
    })
  }

  private loadProperties() {
    this.cityService.getCityProperties(this.cityId).subscribe({
      next: (response) => {
        const res = JSON.parse(JSON.stringify(response));
        console.log(res.data)
        this.properties = res.data.properties;
      },
      error: err => {
        this.toastrService.error(err.error.message, 'ERRO');
      }
    })
  }

  calculateValue(property: PropertyModel) {
    return
  }

  calculateIPTU(property: PropertyModel) {

  }
}
