import { PrimaryGeneratedColumn } from 'typeorm';
import { DefaultModel, ParanoidDefaultModel } from './DefaultModel';

export class BaseModel extends DefaultModel {
  @PrimaryGeneratedColumn('uuid')
  id!: string;
}

export class ParanoidBaseModel extends ParanoidDefaultModel {
  @PrimaryGeneratedColumn('uuid')
  id!: string;
}
