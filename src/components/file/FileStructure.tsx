import React from "react";

// const ORG_DATA = {
//   ID: "1",
//   ORG_STRUCTURE_NAME: "tanfeeth",
//   PARENT_ID: "0",
//   STATUS: "1",
//   CUST_ID: "2",
//   CREATED_AT: "2024-03-01T05:34:13.000Z",
//   UPDATED_AT: "2024-03-01T05:34:13.000Z",
//   CREATED_BY: "2",
//   UPDATED_BY: "0",
//   children: [
//     {
//       ID: "2",
//       ORG_STRUCTURE_NAME: "tanfeeth-ksa",
//       PARENT_ID: "1",
//       STATUS: "1",
//       CUST_ID: "2",
//       CREATED_AT: "2024-03-01T05:34:28.000Z",
//       UPDATED_AT: "2024-03-01T05:34:28.000Z",
//       CREATED_BY: "2",
//       UPDATED_BY: "0",
//       children: [
//         {
//           ID: "4",
//           ORG_STRUCTURE_NAME: "finance",
//           PARENT_ID: "3",
//           STATUS: "1",
//           CUST_ID: "2",
//           CREATED_AT: "2024-03-01T05:35:13.000Z",
//           UPDATED_AT: "2024-03-01T05:35:13.000Z",
//           CREATED_BY: "2",
//           UPDATED_BY: "0",
//           children: [
//             {
//               ID: "5",
//               ORG_STRUCTURE_NAME: "personal-finance",
//               PARENT_ID: "4",
//               STATUS: "1",
//               CUST_ID: "2",
//               CREATED_AT: "2024-03-01T05:35:23.000Z",
//               UPDATED_AT: "2024-03-01T05:35:23.000Z",
//               CREATED_BY: "2",
//               UPDATED_BY: "0",
//             },
//           ],
//         },
//       ],
//     },
//     {
//       ID: "7",
//       ORG_STRUCTURE_NAME: "tanfeet-In",
//       PARENT_ID: "1",
//       STATUS: "1",
//       CUST_ID: "1",
//       CREATED_AT: "2024-03-01T05:40:45.000Z",
//       UPDATED_AT: "2024-03-01T05:40:45.000Z",
//       CREATED_BY: "1",
//       UPDATED_BY: "0",
//     },
//     {
//       ID: "8",
//       ORG_STRUCTURE_NAME: "tanfeet-USA",
//       PARENT_ID: "1",
//       STATUS: "1",
//       CUST_ID: "1",
//       CREATED_AT: "2024-03-01T05:41:21.000Z",
//       UPDATED_AT: "2024-03-01T05:41:21.000Z",
//       CREATED_BY: "1",
//       UPDATED_BY: "1",
//     },
//   ],
// };

const FileStructure = ({ data }: { data: any }) => {
  if (!data.children) return null;
  return (
    <>
      <h1>{data?.ORG_STRUCTURE_NAME}</h1>
      {data.children &&
        data.children.map((item: any, idx: number) => {
          return <FileStructure key={idx} data={item} />;
        })}
    </>
  );
};

export default FileStructure;
