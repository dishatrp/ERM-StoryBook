import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  templateId: number | undefined
} = {
  templateId: undefined,
};

const TemplateIdSlice = createSlice({
  name: "templateId",
  initialState,
  reducers: {
    setTemplateId: (state, { payload }: { payload: undefined | number }) => {
      state.templateId = payload || undefined
    },
  },
});

export default TemplateIdSlice.reducer;

export const { setTemplateId } = TemplateIdSlice.actions;