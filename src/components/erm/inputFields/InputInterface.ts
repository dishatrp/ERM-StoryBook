import { ReactNode } from "react";
import { ControllerRenderProps, FieldValues, UseFormRegister } from "react-hook-form";

export interface InputFieldPorps {
  placeholder?: string;
  label?: ReactNode;
  disabled?: boolean;
  name: string;
  error?: string;
  max?: number;
  min?: number;
  tooltip: string
  data?: any
  searchable?: boolean
  id?: string
  onChange?: (value: string | null) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  value?: string,
  controller?: boolean
}