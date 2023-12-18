import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AllowNull,
  AutoIncrement,
  Unique,
  HasOne,
} from 'sequelize-typescript';

import { Token } from './Token';

@Table({
  tableName: 'users',
  timestamps: false,
})
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column
    id: number;

  @HasOne(() => Token)
    token: Token;

  @AllowNull(false)
  @Column
    name: string;

  @AllowNull(false)
  @Unique
  @Column
    email: string;

  @AllowNull(false)
  @Column
    password: string;

  @AllowNull(true)
  @Column
    activationToken: string;
}
