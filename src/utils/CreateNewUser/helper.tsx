import Loader from "@/components/Loader";

interface LoaderComponent {
  isLoading: boolean;
  listUserLoading: boolean;
  customerLoading: boolean;
  singleUserLoading: boolean;
  permissionLoading: boolean;
  updateUserLoading: boolean;
}

export function findUniqueElements(arr: any[]) {
  let uniqueArray = [];
  for (var i = 0; i < arr.length; i++) {
    let element = arr[i];
    const { policyId, clientId, policyName, clientName } = element;

    if (typeof element === "string" && uniqueArray.indexOf(element) === -1) {
      uniqueArray.push(element);
    } else if (typeof element === "object") {
      const { policyId, clientId, policyName, clientName } = element;
      const str = `${policyId},${clientId},${policyName},${clientName}`;
      //const str = `${clientId}`;
      if (uniqueArray.indexOf(str) === -1) {
        uniqueArray.push(str);
      }
    } else {
      //console.log("Not unique");
      // Handle other types if needed
      break;
    }
  }

  return uniqueArray;
}

export function findUniqueElements2(arr: any[]) {
  let uniqueElements: any[] = [];
  arr.forEach((element) => {
    if (!uniqueElements.includes(element)) {
      uniqueElements.push(element);
    }
  });
  return uniqueElements;
}

const LoaderComponent = ({
  isLoading,
  listUserLoading,
  customerLoading,
  singleUserLoading,
  permissionLoading,
  updateUserLoading,
}: LoaderComponent) => {
  return (
    <Loader
      visible={
        isLoading || listUserLoading || customerLoading || singleUserLoading || permissionLoading || updateUserLoading
      }
    />
  );
};
