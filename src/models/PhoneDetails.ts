import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AllowNull,
  DataType,
} from 'sequelize-typescript';

import { PhoneDetails as IPhoneDetails } from '../types/PhoneDetails';

@Table({
  tableName: 'phone_details',
  timestamps: false,
})
export class PhoneDetails extends Model<IPhoneDetails> {
  @PrimaryKey
  @AllowNull(false)
  @Column
    id: string;

  @Column
    namespaceId: string;

  @Column
    name: string;

  @AllowNull(true)
  @Column(DataType.JSONB)
    capacityAvailable: string[];

  @Column
    capacity: string;

  @Column
    priceRegular: number;

  @Column
    priceDiscount: number;

  @Column(DataType.JSONB)
    colorsAvailable: string[];

  @Column
    color: string;

  @Column(DataType.JSONB)
    images: string[];

  @Column(DataType.JSONB)
    description: { title: string; text: string[] }[];

  @Column
    screen: string;

  @Column
    resolution: string;

  @Column
    processor: string;

  @Column
    ram: string;

  @Column
    camera: string;

  @Column
    zoom: string;

  @Column(DataType.JSONB)
    cell: string[];
}
