import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from '@sequelize/core';
import { AfterFind, AllowNull, Attribute, AutoIncrement, NotNull, PrimaryKey, Unique } from '@sequelize/core/decorators-legacy';
import UserInterface from '../interfaces/user-interface';
import { serviceTypes } from '../utilities/constants';

export default class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare name: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  @Unique
  declare email: string;

  @Attribute(DataTypes.INTEGER)
  @AllowNull
  declare mobile: number | null;

  @Attribute(DataTypes.INTEGER)
  @AllowNull
  declare postcode: number | null;

  @Attribute(DataTypes.TINYINT)
  @NotNull
  declare service: number;

  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

  @AfterFind
  public static test(data: UserInterface | UserInterface[]) {
    if (Array.isArray(data)) {
      data.map((user: UserInterface) => { user.serviceType = serviceTypes[user.service] });
    }

    return data;
  }
}