import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import loginReducer from "./slice/loginSlice";
import { authApi } from "./api/authApiSlice";
import { clientApi } from "./api/clientApiSlice";
import PermissionSlice from "./slice/PermissionSlice";
import RegisternewClientSlice from "./slice/RegisterNewClientSlice";
import { createNewUserApi } from "./api/createNewUserApiSlice";
import checkedslice from "./slice/checkedslice";
import imagleSlice from "./slice/imagleSlice";
import { PermissionApi } from "./api/PermissionApiSlice";
import { ermSliceReducer } from "./slice/ermSlice";
import { ermApi } from "./api/ermApiSlice";
import { ermNewApi } from "./api/ermNewApiSlice";
import { ermPhases } from "./api/ermPhases";
import TemplateIdSlice from "./slice/TemplateIdSlice";
import { ermNewSliceReducer } from "./slice/ermNewSlice";
import { ermAudit } from "./api/ermAudit";
import auditSlice from "./slice/auditSlice";
import { ermMasterData } from "./api/ermMasterDataSlice";
import IdentifyIdSlice from "./slice/IdentifyIdSlice";

const store = configureStore({
  reducer: {
    [ermMasterData.reducerPath]: ermMasterData.reducer,
    [ermNewApi.reducerPath]: ermNewApi.reducer,
    [ermApi.reducerPath]: ermApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [clientApi.reducerPath]: clientApi.reducer,
    [createNewUserApi.reducerPath]: createNewUserApi.reducer,
    [PermissionApi.reducerPath]: PermissionApi.reducer,
    [ermPhases.reducerPath]: ermPhases.reducer,
    [ermAudit.reducerPath]: ermAudit.reducer,
    auth: loginReducer,
    permission: PermissionSlice,
    regNewClient: RegisternewClientSlice,
    checkStatus: checkedslice,
    imageStatus: imagleSlice,
    erm: ermSliceReducer,
    ermNew: ermNewSliceReducer,
    templateId: TemplateIdSlice,
    identifyId:IdentifyIdSlice,
    auditData: auditSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat([
      ermMasterData.middleware,
      ermNewApi.middleware,
      ermApi.middleware,
      authApi.middleware,
      clientApi.middleware,
      createNewUserApi.middleware,
      PermissionApi.middleware,
      ermPhases.middleware,
      ermAudit.middleware,
    ]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
