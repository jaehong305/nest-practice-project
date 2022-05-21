import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Board {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 60 })
  title: string;

  @Column({ type: 'text' })
  content: string;
}
