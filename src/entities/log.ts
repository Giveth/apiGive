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
  url: string;
  @Column()
  method: string;
  @Column('text', { nullable: true })
  scope?: string;
  @Column()
  status: string;
  @Column('text', { nullable: true })
  ip?: string;
  @Column('integer', { nullable: true })
  statusCode?: number;
  @Column('text', { nullable: true })
  error?: string;
  @Column()
  trackId: string;
  @Column('text', { nullable: true })
  result?: string;
  // @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(1)" })
  // createdAt: Date;
  // @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(1)", onUpdate: "CURRENT_TIMESTAMP(1)" })
  // updatedAt: Date;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
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
