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
  @Column()
  scope?: string;
  @Column()
  status: string;
  @Column()
  ip: string;
  @Column()
  statusCode?: number;
  @Column()
  error?: string;
  @Column()
  trackId: string;
  @Column()
  createdAt: string;
  @Column()
  updatedAt: string;
  @Column()
  result?: string;
  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public created_at: Date;
  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updated_at: Date;
  @Index()
  @ManyToOne(_type => Application)
  application?: Application;
  @RelationId((log: Log) => log.application)
  applicationId?: number;

  @Index()
  @ManyToOne(_type => AccessToken)
  accessToken: AccessToken;
  @RelationId((log: Log) => log.accessToken)
  accessTokenId: number;
}
