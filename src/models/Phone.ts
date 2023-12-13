import {
  Table,
  Column,
  Model,
  PrimaryKey,
  ForeignKey,
  AllowNull,
  AutoIncrement,
} from 'sequelize-typescript';

import { PhoneDetails } from './PhoneDetails';
import { Phone as IPhone } from '../types/Phone';

@Table({
  tableName: 'phones',
  timestamps: false,
})
export class Phone extends Model<IPhone> {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column
    id: number;

  @Column
    category: string;

  @ForeignKey(() => PhoneDetails)
  @Column
    phoneId: string;

  @Column
    itemId: string;

  @Column
    name: string;

  @Column
    fullPrice: number;

  @Column
    price: number;

  @Column
    screen: string;

  @Column
    capacity: string;

  @Column
    color: string;

  @Column
    ram: string;

  @Column
    year: number;

  @Column
    image: string;
}
