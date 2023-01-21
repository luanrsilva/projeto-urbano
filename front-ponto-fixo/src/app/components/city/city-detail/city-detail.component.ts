import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { CityService } from "../../../services/city/city.service";
import { CityModel } from "../../../models/city.model";
import { ToastrService } from "ngx-toastr";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { toNumbers } from "@angular/compiler-cli/src/diagnostics/typescript_version";

@Component({
  selector: 'app-city-detail',
  templateUrl: './city-detail.component.html',
  styleUrls: ['./city-detail.component.scss']
})
export class CityDetailComponent implements OnInit {
  title!: string;
  description!: string;
  cityId!: string;
  isNew = false;
  city!: CityModel;

  public formGroup!: FormGroup;
  private activeTab: any;

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    private cityService: CityService,
    private fb: FormBuilder,
    private toastrService: ToastrService
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.setPage();
  }

  setPage() {
    this.route.url.subscribe(params => {
      if (!params) return;
      if (params[1].path === 'new') {
        this.isNew = true;
        this.title = 'Nova Cidade';
        this.description = 'Adicionando uma nova cidade';
        this.city = new CityModel();
      } else {
        this.cityId = params[1].toString();
        this.getCity();
      }
    });
  }


  saveCity() {
    this.buildCity();
    this.cityService.save(this.city).subscribe({
      next: (response) => {
        const res = JSON.parse(JSON.stringify(response));
        this.toastrService.success(res.message,'SUCESSO');
        this.goToCityList();
      },
      error: err => {
        this.toastrService.error(err.error.message, 'ERRO');
      }
    })
  }

  private buildForm() {
    this.formGroup = this.fb.group({
      name: ['', [Validators.required]],
      iptu: ['', []]
    });
  }

  private buildCity() {
    this.city.name = this.formGroup.get('name')?.value;
    this.city.iptuAliquot = this.formGroup.get('iptu')?.value;
  }

  private getCity() {
    this.cityService.getById(this.cityId).subscribe({
      next: value => {
        const res = JSON.parse(JSON.stringify(value));
        this.city = res.data;
        this.title = this.city.name;
        this.description = 'Alíquota IPTU: ' + this.city.iptuAliquot + "%";
      },
      error: err => {
        this.toastrService.error(err.error.message, 'ERRO');
      }
    });

    this.title = '1'
  }

  private goToCityList() {
    this.router.navigate(['/cities/'])
  }

  setActiveTab(tab: 'DETAILS' | 'SECTORS' | 'PROPERTIES'): void {
    this.activeTab = tab;
  }

  isActiveTab(tab: 'DETAILS' | 'SECTORS' | 'PROPERTIES'): boolean {
    if(!this.activeTab) {
      this.activeTab = tab;
      return this.activeTab === tab;
    }
    return this.activeTab === tab;
  }
}
