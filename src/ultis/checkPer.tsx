export const checkPer = (dataUser: any[], permission: string) => {
  let checkSuccess = dataUser.map((item) => {
    return item.per.some((ro: any) => {
      return permission === ro.slug;
    });
  });
  return checkSuccess.some((item) => item);
};
