import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Bank' })
export class Bank {
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;

  @Column({ name: 'Name', type: 'varchar' })
  name: string;

  @Column({ name: 'Code', type: 'varchar' })
  code: string;
}
