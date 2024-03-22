import { Checkbox, Table } from "@mantine/core";

const Tables = ({ data, onChange, index }: any) => {
  interface Page {
    pageMst_ID: string;
    pageMst_ITEM: string;
    pageMst_SLUG: string;
    pageMst_HIERARCHY: string;
    pageMst_IS_ACTIVE: string;
    ID?: string;
    POLICY_ID?: string;
    ITEM_ID?: string;
    READOPS: string;
    CREATEOPS: string;
    UPDATEOPS: string;
    DELETEOPS: string;
    CRD_DATE?: string;
    LAST_UPD_DATE?: string;
    CRD_USR_ID?: string;
    UPD_USR_ID?: string;
    ICON?: string | null;
    ACTION_URL?: string | null;
    children?: Page[];
  }

  const checkedCheckbox = (el: Page) => {
    const elements = el.CREATEOPS === "0" && el.DELETEOPS === "0" && el.READOPS === "0" && el.UPDATEOPS === "0";
    if (el.CREATEOPS === "0" && elements) {
    }
    // if(el.CREATEOPS=== '0' ||)
  };

  const rows = data?.map((el: Page, secIndex: number) => {
    const elements = el.CREATEOPS === "0" && el.DELETEOPS === "0" && el.READOPS === "0" && el.UPDATEOPS === "0";
    return (
      <tr key={el.pageMst_ITEM}>
        <td>
          <Checkbox
            //checked={el.pageMst_IS_ACTIVE === "Y"}
            checked={el.CREATEOPS === "1" && el.DELETEOPS === "1" && el.READOPS === "1" && el.UPDATEOPS === "1"}
            label={el.pageMst_ITEM}
            onChange={() => onChange(index, el.pageMst_HIERARCHY, secIndex)}
            indeterminate={
              (el.CREATEOPS === "0" && !elements) ||
              (el.DELETEOPS === "0" && !elements) ||
              (el.READOPS === "0" && !elements) ||
              (el.UPDATEOPS === "0" && !elements)
            }
          />
        </td>
        <td>
          <Checkbox
            checked={el.CREATEOPS == "1" ? true : false}
            onChange={() => onChange(index, el.pageMst_HIERARCHY, secIndex, "create", el.CREATEOPS, "CREATEOPS")}
          />
        </td>
        <td>
          <Checkbox
            checked={el.READOPS == "1" ? true : false}
            onChange={() => onChange(index, el.pageMst_HIERARCHY, secIndex, "read", el.READOPS, "READOPS")}
          />
        </td>
        <td>
          <Checkbox
            checked={el.UPDATEOPS == "1" ? true : false}
            onChange={() => onChange(index, el.pageMst_HIERARCHY, secIndex, "update", el.UPDATEOPS, "UPDATEOPS")}
          />
        </td>
        <td>
          <Checkbox
            checked={el.DELETEOPS == "1" ? true : false}
            onChange={() => onChange(index, el.pageMst_HIERARCHY, secIndex, "delete", el.DELETEOPS, "DELETEOPS")}
          />
        </td>
      </tr>
    );
  });

  return (
    <Table horizontalSpacing='sm' verticalSpacing='sm' striped highlightOnHover withBorder withColumnBorders>
      <thead>
        <tr>
          <th>Name</th>
          <th>Create</th>
          <th>Read</th>
          <th>Update</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
};

export default Tables;
