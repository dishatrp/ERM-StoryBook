import { InputFieldsProps } from "@/components/FormGrid";
import {
  ApiResponseSingleClient,
  RequestNewClient,
  ResponseCLient,
} from "@/store/interface/ClientInterface";
import { IconEdit } from "@tabler/icons-react";
import { IconTrash } from "@tabler/icons-react";
import { UseFormSetValue } from "react-hook-form";

interface addModuleDateRangeNameProps {
  ModuleLicense: string;
  startDate: string;
  endDate: string;
  index: number;
  ModuleLicenseName?: string;
}

interface moduleProps extends addModuleDateRangeNameProps {
  ModuleLicenseName: string;
}

/* Types declaration for dropdown data .  */
interface moduleSelectionDropdownprops {
  value: string;
  label: string;
}

export const addModuleNameDateRangeHandler = (
  setmoduleNameDateRange: React.Dispatch<
    React.SetStateAction<[] | addModuleDateRangeNameProps[]>
  >,
  setValue: UseFormSetValue<{
    ModuleLicense: string;
    moduleDate: string[];
  }>,
  setismoduleNameDropdownDisable: React.Dispatch<
    React.SetStateAction<InputFieldsProps[]>
  >,
  ModuleLicense: string,
  moduleDateRange: string[],
  data: any
) => {
  const newObj: addModuleDateRangeNameProps = {
    ModuleLicense,
    ModuleLicenseName: data?.modules?.find((el: any) => el.ID === ModuleLicense)
      ?.ITEM,
    startDate: moduleDateRange[0],
    endDate: moduleDateRange[1],
    index: data?.modules?.find((el: any) => el.ID === ModuleLicense)?.ITEM, //Date.now(),
  };

  setmoduleNameDateRange((prev: addModuleDateRangeNameProps[]) => {
    const selection = [...prev, newObj]?.map(
      (el: addModuleDateRangeNameProps) => el?.ModuleLicense
    );

    setismoduleNameDropdownDisable((prevs: InputFieldsProps[]) => {
      let update = JSON.parse(JSON.stringify(prevs));

      update?.[0]?.data.forEach(
        (item: moduleSelectionDropdownprops, idx: number) => {
          if (selection.includes(item.value)) {
            update[0].data[idx].disabled = true;
          }
        }
      );

      return update;
    });

    return [...prev, newObj];
  });
  setValue("ModuleLicense", "");
  setValue("moduleDate", ["", ""]);
};

export const editHandler = (
  index: number,
  moduleNameDateRange: [] | addModuleDateRangeNameProps[],
  setValue: UseFormSetValue<{
    ModuleLicense: string;
    moduleDate: string[];
  }>,
  setmoduleNameDateRange: React.Dispatch<
    React.SetStateAction<[] | addModuleDateRangeNameProps[]>
  >,
  setismoduleNameDropdownDisable: React.Dispatch<
    React.SetStateAction<InputFieldsProps[]>
  >
) => {
  /* choosing the index  from the  moduleNameDateRange array where the click happen. */
  const dataD: [] | addModuleDateRangeNameProps[] = moduleNameDateRange?.filter(
    (el: addModuleDateRangeNameProps) => el?.index === index
  );

  /* setting the value to the input field by using RHF setValue methods which will take the field name and set the value of the field. */
  setValue("ModuleLicense", dataD[0]?.ModuleLicense);
  setValue("moduleDate", [dataD[0]?.startDate, dataD[0]?.endDate]);

  /*  enabling  the module Name from dropdown which is  disabled and user decided to edit that from moduleNameDateRange array */
  setmoduleNameDateRange((prev: addModuleDateRangeNameProps[]) => {
    const editValue = prev?.filter(
      (el: addModuleDateRangeNameProps) => el.index !== index
    );
    const selection = editValue?.map(
      (el: addModuleDateRangeNameProps) => el?.ModuleLicense
    );

    setismoduleNameDropdownDisable((prevs: InputFieldsProps[]) => {
      let update = JSON.parse(JSON.stringify(prevs));
      update?.[0]?.data.forEach(
        (item: moduleSelectionDropdownprops, idx: number) => {
          if (!selection.includes(item.value)) {
            update[0].data[idx].disabled = false;
          }
        }
      );

      return update;
    });
    return editValue;
  });
};

export const deleteHandler = (
  index: number,
  setmoduleNameDateRange: (
    value: React.SetStateAction<[] | addModuleDateRangeNameProps[]>
  ) => void,
  setismoduleNameDropdownDisable: (
    value: React.SetStateAction<InputFieldsProps[]>
  ) => void
) => {
  setmoduleNameDateRange((prev: addModuleDateRangeNameProps[]) => {
    const values = prev?.filter(
      (el: addModuleDateRangeNameProps) => el.index !== index
    );

    const selection = values?.map(
      (el: addModuleDateRangeNameProps) => el?.ModuleLicense
    );

    setismoduleNameDropdownDisable((prevs: InputFieldsProps[]) => {
      let update = JSON.parse(JSON.stringify(prevs));

      update?.[0]?.data.forEach(
        (item: moduleSelectionDropdownprops, idx: number) => {
          if (!selection.includes(item.value)) {
            update[0].data[idx].disabled = false;
          }
        }
      );

      return update;
    });
    return values;
  });
};

/* This handler is used for validation of Add button which is used in Module. This validation prevents to add blank data in moduleNameDateRange state. When we use start and end date in a same input field of mantine UI it returns an array of object. So We have to validate both start and end date, otherwise it could lead to unforeseen errors. So we use !moduleDateRange[0] and !moduleDateRange[1]. */
export const addButtonValidationHandler = (
  moduleNames: string,
  moduleDateRange: string[]
) =>
  !moduleNames ||
  moduleDateRange.length <= 0 ||
  !moduleDateRange[0] ||
  !moduleDateRange[1]
    ? true
    : false;

/* This handler takes an array of object which is an type of InputFieldsProps and based on the length and first object name,  it decides the label, description and the title of the page. */
export const labelDescriptionTitleHandler = (el: InputFieldsProps[]) => {
  if (el.length >= 12) {
    return {
      label: "General",
      description: "STEP 1",
      title: "Please provide your general information to continue",
    };
  } else if (el.length >= 3) {
    return {
      label: "Contact",
      description: "STEP 2",
      title: "Kindly share your contact details to proceed",
    };
  } else if (el.length >= 2 && el[0].name === "DeploymentType") {
    return {
      label: "Deployment",
      description: "STEP 3",
      title:
        "Please furnish deployment-related information to facilitate the next steps",
    };
  } else if (el.length >= 2 && el[0].name === "ModuleLicense") {
    return {
      label: "Module",
      description: "STEP 6",
      title: "Kindly input the module name for seamless integration.",
    };
  } else if (el.length >= 1 && el[0].name === "DataBaseType") {
    return {
      label: "Database",
      description: "STEP 4",
      title:
        "Please input the database details to ensure smooth data management",
    };
  } else if (el.length >= 1 && el[0].name === "ERP") {
    return {
      label: "ERP",
      description: "STEP 5",
      title:
        "Share the ERP system's name, along with its commencement and conclusion dates, for streamlined record-keeping",
    };
  }
};

//Structured Data for Table
export const structredData = (
  moduleNameDateRange: [] | addModuleDateRangeNameProps[],
  setValue: UseFormSetValue<{
    ModuleLicense: string;
    moduleDate: string[];
  }>,
  setmoduleNameDateRange: React.Dispatch<
    React.SetStateAction<[] | addModuleDateRangeNameProps[]>
  >,
  setismoduleNameDropdownDisable: React.Dispatch<
    React.SetStateAction<InputFieldsProps[]>
  >,
  classes: {
    root: string;
    logoDelete: string;
    logoEdit: string;
  }
) => {
  return moduleNameDateRange.map((el, i) => {
    return {
      ...el,
      startDate: new Date(el.startDate).toDateString(),
      endDate: new Date(el.endDate).toDateString(),
      edit: (
        <IconEdit
          style={{ cursor: "pointer" }}
          onClick={() =>
            editHandler(
              el.index,
              moduleNameDateRange,
              setValue,
              setmoduleNameDateRange,
              setismoduleNameDropdownDisable
            )
          }
          className={classes.logoEdit}
        />
      ),
      delete: (
        <IconTrash
          style={{ cursor: "pointer" }}
          onClick={() =>
            deleteHandler(
              el.index,
              setmoduleNameDateRange,
              setismoduleNameDropdownDisable
            )
          }
          className={classes.logoDelete}
        />
      ),
    };
  });
};

//Structured Data for Submmiting Request:
export function submitRequest(
  value: any,
  checked: boolean | null,
  image64: string | ArrayBuffer | null | undefined,
  CustomerId?: number | undefined | null,
  moduleNameDateRange?: addModuleDateRangeNameProps[] | moduleProps[],
  isSubmit?: boolean,
  custLogoStr?: string
) {
  value["module"] = moduleNameDateRange;
  delete value["moduleDate"];
  delete value["moduleName"];
  delete value["ModuleLicense"];
  const {
    CustomerTypeMasterId,
    ParentCustomerId,
    ClientLegalEntity,
    HeadQuarter,
    EmployeeRange,
    ScopeEntity,
    EngagementType,
    RevenueRange,
    Auditor,
    ContactNumber,
    Designation,
    EmailAddress,
    CustLogo,
    DataBaseType,
    ComplianceRequirement,
    DataSourceFileUpload,
    PrimaryContact,
    ERP,
    DeploymentType,
    NumberOfProductionInstance,
    module,
  } = value;
  const formattedData = module.map(
    ({ index, startDate, endDate, ...rest }: addModuleDateRangeNameProps) => ({
      ...rest,
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
    })
  );
  const checkedData = (value: boolean | null) => {
    if (value === null) return undefined;
    else if (value) return "Y";
    else return "N";
  };

  const checkCustLogo = (value: any) => {
    if (typeof value === "object" && value.name !== "") {
      return value.name;
    } else {
      return custLogoStr;
    }
  };
  const output: RequestNewClient = {
    clientDetail: {
      CustomerTypeMasterId,
      ParentCustomerId,
      ClientLegalEntity,
      HeadQuarter,
      EmployeeRange,
      ScopeEntity,
      EngagementType,
      RevenueRange,
      Auditor,
      ContactNumber,
      Designation,
      EmailAddress,
      CustLogo: checkCustLogo(CustLogo),
      // DataBaseType: isSubmit ? DataBaseType : null,
      DataBaseType,
      PrimaryContact,
      isActive: checkedData(checked),
      image64: image64 === null ? "" : image64,
      CustomerId: CustomerId === null ? undefined : CustomerId,
    },
    ComplianceRequirement,
    DataSourceFileUpload,
    ERP,
    deployment: {
      DeploymentType,
      NumberOfProductionInstance,
    },
    moduleLicenses: formattedData,
  };
  return output;
}

export function updateRequest(
  value: any,
  image64?: string | ArrayBuffer | null | undefined,
  CustomerId?: number | undefined
) {
  const {
    CustomerTypeMasterId,
    ParentCustomerId,
    ClientLegalEntity,
    HeadQuarter,
    EmployeeRange,
    ScopeEntity,
    EngagementType,
    RevenueRange,
    Auditor,
    ContactNumber,
    Designation,
    EmailAddress,
    CustLogo,
    ComplianceRequirement,
    DataSourceFileUpload,
    PrimaryContact,
    ERP,
    DeploymentType,
    NumberOfProductionInstance,
    module,
  } = value;
  const formattedData: Omit<addModuleDateRangeNameProps, "index">[] =
    module.map(
      ({
        index,
        startDate,
        endDate,
        ...rest
      }: addModuleDateRangeNameProps) => ({
        ...rest,
        startDate: new Date(startDate).toISOString(),
        endDate: new Date(endDate).toISOString(),
      })
    );
  const output = {
    clientDetail: {
      CustomerTypeMasterId,
      ParentCustomerId,
      ClientLegalEntity,
      HeadQuarter,
      EmployeeRange,
      ScopeEntity,
      EngagementType,
      RevenueRange,
      Auditor,
      ContactNumber,
      Designation,
      EmailAddress,
      CustLogo: typeof CustLogo === "object" ? CustLogo.name : CustLogo,
      PrimaryContact,
      image64: image64 === null ? undefined : image64,
      CustomerId,
    },
    ComplianceRequirement,
    DataSourceFileUpload,
    ERP,
    deployment: {
      DeploymentType,
      NumberOfProductionInstance,
    },
    moduleLicenses: formattedData,
  };
  return output;
}

export function structredEdittedData(editedData: ApiResponseSingleClient) {
  const {
    ClientLegalEntity,
    ScopeEntity,
    CustomerTypeMasterId,
    EngagementType,
    HeadQuarter,
    RevenueRange,
    Auditor,
    ParentCustomerId,
    Designation,
    EmployeeRange,
    EmailAddress,
    ContactNumber,
    PrimaryContact,
    CustLogo,
    CustomerId,
  } = editedData.data.clientDetail;
  const { ComplianceRequirement, DataSourceFileUpload, ERP, moduleLicenses } =
    editedData.data;
  const { DeploymentType, NumberOfProductionInstance } =
    editedData.data.deployment;

  const setData = {
    ClientLegalEntity,
    PrimaryContact,
    CustLogo,
    ScopeEntity,
    CustomerTypeMasterId,
    EngagementType,
    HeadQuarter,
    RevenueRange,
    Auditor,
    ParentCustomerId,
    Designation,
    EmployeeRange,
    EmailAddress,
    ContactNumber,
    ComplianceRequirement,
    DataSourceFileUpload,
    ERP,
    moduleLicenses,
    DeploymentType,
    NumberOfProductionInstance,
  };

  return setData;
}

export const readFileAsDataURL = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("Failed to read file as Data URL."));
      }
    };

    reader.readAsDataURL(file);
  });
};

/*
  "ID": "76",
                "CUST_ID": "112",
                "POLICY_NAME": "legalPolicy"

                "password": "Welcome@123",
    "userName": "iRM.ADQT",

*/
