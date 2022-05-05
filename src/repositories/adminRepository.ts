import { Admin, AdminRole } from '../entities/admin';

export const findAdminByEmail = async (
  email: string,
): Promise<Admin | null> => {
  return Admin.createQueryBuilder()
    .where(`email = :email`, { email })
    .andWhere(`role != '${AdminRole.RESTRICTED}'`)
    .getOne();
};
