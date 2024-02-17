import { BaseModel } from 'src/models/BaseModel';
import { Column, Entity } from 'typeorm';

@Entity('User')
export class User extends BaseModel {
  @Column()
  name!: string;

  @Column()
  age!: number;

  @Column()
  gender!: string;

  @Column()
  country!: string;

  @Column({ default: 'Active' })
  status!: string;
}
