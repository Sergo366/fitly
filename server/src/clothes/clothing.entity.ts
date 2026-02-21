import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Season } from '@fitly/shared';

@Entity()
export class Clothing {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  userTitle: string;

  @Column()
  type: string;

  @Column({ nullable: true })
  category: string;

  @Column('simple-array', { nullable: true })
  seasons: Season[];

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ nullable: true })
  ticker: string;

  @ManyToOne(() => User, (user) => user.clothes, { onDelete: 'CASCADE' })
  user: User;

  @Column()
  userId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
