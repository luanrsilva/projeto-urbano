import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SectorService } from "../../services/sector/sector.service";
import { SectorModel } from "../../models/sector.module";
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute } from "@angular/router";
import { CityModel } from "../../models/city.model";
import { CityService } from "../../services/city/city.service";

@Component({
  selector: 'app-sector',
  templateUrl: './sector.component.html',
  styleUrls: ['./sector.component.scss']
})
export class SectorComponent implements OnInit {


  public formGroup!: FormGroup;
  sectors!: SectorModel[];
  sector!: SectorModel;
  cityId!: string;

  constructor(
    private fb: FormBuilder,
    public route: ActivatedRoute,
    private sectorService: SectorService,
    private toastrService: ToastrService,
    private cityService: CityService)
  {
    this.buildForm();
  }

  ngOnInit(): void {
    this.setPage();
    this.loadSectors();
  }

  private setPage() {
    this.sector = new SectorModel();
    this.route.url.subscribe(params => {
      if (!params) return;
      this.cityId = params[1].path;
    });
  }

  private buildForm() {
    this.formGroup = this.fb.group({
      name: ['', [Validators.required]],
      value: ['', [Validators.required]]
    });
  }

  saveSector() {
    this.buildSector();
    this.sectorService.save(this.sector).subscribe({
      next: (response) => {
        const res = JSON.parse(JSON.stringify(response));
        this.toastrService.success(res.message,'SUCESSO');
      },
      error: err => {
        this.toastrService.error(err.error.message, 'ERRO');
      }
    })
    this.buildForm();
    this.loadSectors();
  }

  private buildSector() {
    this.sector.name = this.formGroup.get('name')?.value;
    this.sector.value = this.formGroup.get('value')?.value;
    this.sector.cityId = this.cityId;
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
}
