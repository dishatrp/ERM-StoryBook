import { Page } from "./PermissinManagement";

export const shapedData = (policies: Page[] | [] | Page[]) => {
  return policies.map((el) => {
    const flag = el?.children?.every((el1) => {
      return el1.CREATEOPS === "0" && el1.READOPS === "0" && el1.DELETEOPS === "0" && el1.UPDATEOPS === "0";
    });
    //console.log("flag123", flag, flag ? "N" : "Y");

    const flag2 = el?.children?.some(
      (el) => el.CREATEOPS === "0" && el.READOPS === "0" && el.DELETEOPS === "0" && el.UPDATEOPS === "0"
    );
    //console.log(flag2, "flag2", !flag && flag2 ? "I" : "N");
    const flagDecider = () => {
      if (flag) return "N";
      else if (!flag) {
        return flag2 ? "I" : "Y";
      }
    };
    return {
      ...el,
      pageMst_IS_ACTIVE: flagDecider(),
    };
  });
};

export const transformData = (inputData: Page[]) => {
  let result: any = [];

  for (let item of inputData) {
    let policyData = {
      ID: item.pageMst_ID,
      READOPS: "0",
      CREATEOPS: "0",
      UPDATEOPS: "0",
      DELETEOPS: "0",
    };

    if (item.children && item.children.length > 0) {
      let childrenData = item.children.map((child) => ({
        ID: child.pageMst_ID,
        READOPS: child.READOPS,
        CREATEOPS: child.CREATEOPS,
        UPDATEOPS: child.UPDATEOPS,
        DELETEOPS: child.DELETEOPS,
      }));

      if (
        childrenData.some(
          (child) =>
            child.READOPS === "1" || child.CREATEOPS === "1" || child.UPDATEOPS === "1" || child.DELETEOPS === "1"
        )
      ) {
        policyData.READOPS = "1";
        policyData.CREATEOPS = "1";
        policyData.UPDATEOPS = "1";
        policyData.DELETEOPS = "1";
      }

      result.push(policyData);
      result = result.concat(childrenData);
    } else {
      result.push(policyData);
    }
  }

  return result;
};
