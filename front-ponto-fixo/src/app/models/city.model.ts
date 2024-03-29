import { SectorModel } from "./sector.module";

export class CityModel {
  _id!: string;
  name!: string;
  iptuAliquot!: number;
  createdAt!: Date;
  sectors!: SectorModel[];
}
