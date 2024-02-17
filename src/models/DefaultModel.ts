import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

export abstract class DefaultModel {
  @Column({ nullable: true, default: null, type: 'uuid' })
  createdBy!: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @Column({ nullable: true, default: null, type: 'uuid' })
  updatedBy!: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;

  @VersionColumn({ default: 1 })
  updateCount!: number;
}

export abstract class ParanoidDefaultModel extends DefaultModel {
  @Column({ default: null, nullable: true, type: 'timestamptz' })
  deletedAt!: Date;
}
