import { Application } from '../entities/application';

export const findApplicationById = async (
  applicationId: number,
): Promise<Application | null> => {
  return Application.createQueryBuilder('application')
    .where(`id = :id`, {
      id: applicationId,
    })
    .getOne();
};

export const findApplicationByIdJoinOrganization = async (
  applicationId: number,
): Promise<Application | null> => {
  return Application.createQueryBuilder('application')
    .leftJoinAndSelect('application.organization', 'organization')
    .where(`application.id = :id`, {
      id: applicationId,
    })
    .getOne();
};

export const findApplicationByLabelAndSecret = async (params: {
  label: string;
  secret: string;
}): Promise<Application | null> => {
  return Application.createQueryBuilder('application')
    .where(`label = :label`, {
      label: params.label,
    })
    .andWhere(`secret = :secret`, {
      secret: params.secret,
    })
    .getOne();
};
