export const generateDuplicateMessage = (entityName: string) =>
  `${entityName} already exist`;

export const isEqualErrorCode = (error: any, errorCode: any): boolean =>
  [`${errorCode}`, errorCode].includes(error?.code || error?.status);
