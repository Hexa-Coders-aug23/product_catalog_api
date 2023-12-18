import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AllowNull,
  AutoIncrement,
  Unique,
} from 'sequelize-typescript';

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
