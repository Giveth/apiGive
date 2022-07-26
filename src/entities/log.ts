import {
  BaseEntity,
  Column, CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId, UpdateDateColumn,
} from 'typeorm';
import { Application } from './application';
import { AccessToken } from './accessToken';

export const LogStatus = {
  PENDING: 'pending',
  DONE: 'done',
  FAILED: 'failed',
};

@Entity()
export class Log extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id: number;
  @Column()
  trackId: string;
  @Column()
  status: string;

  @CreateDateColumn()
  createdAt: Date;
  @Column()
  url: string;

  @Column('text', { nullable: true })
  scope?: string;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  method: string;
  @Column('text', { nullable: true })
  ip?: string;
  @Column('integer', { nullable: true })
  statusCode?: number;
  @Column('text', { nullable: true })
  error?: string;
  @Column('text', { nullable: true })
  result?: string;
  @Index()
  @ManyToOne(_type => Application)
  application?: Application;
  @RelationId((log: Log) => log.application)
  applicationId?: number;
  @Index()
  @ManyToOne(_type => AccessToken)
  accessToken?: AccessToken;
  @RelationId((log: Log) => log.accessToken)
  accessTokenId?: number;
}
