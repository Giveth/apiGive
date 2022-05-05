import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

export enum AdminRole {
  ADMIN = 'admin',
  SUPER_ADMIN = 'superAdmin',
  RESTRICTED = 'restricted',
  OPERATOR = 'operator',
}

@Entity()
@Unique(['email'])
export class Admin extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar' })
  public firstName?: string;

  @Column({ type: 'varchar' })
  public lastName?: string;

  @Column({
    type: 'enum',
    enum: AdminRole,
    default: AdminRole.RESTRICTED,
  })
  role: AdminRole;

  @Column({ type: 'varchar' })
  public email: string;

  @Column({ type: 'varchar' })
  public encryptedPassword: string;
}
