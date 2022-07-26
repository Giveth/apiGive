import {
  BaseEntity,
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { Application } from './application';

@Entity()
export class AccessToken extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  expirationDate?: number;
  @Column('text')
  jwt: string;
  @Column('text')
  jti: string;
  @Column('text', { array: true, default: '{}' })
  scopes: string[];
  @Column()
  isActive: boolean;

  @Index()
  @ManyToOne(() => Application)
  application: Application;
  @RelationId((accessToken: AccessToken) => accessToken.application)
  applicationId: number;
}
