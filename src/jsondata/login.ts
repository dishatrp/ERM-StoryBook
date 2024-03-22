import { InputFieldsProps } from '@/components/FormGrid';

const logininputField: InputFieldsProps[] = [
  {
    name: 'username',
    type: 'text',
    label: 'Username',
    withAsterisk: true,
    placeholder: 'Enter your Username',
    disabled: false,
  },
  {
    name: 'password',
    type: 'password',
    label: 'Password',
    withAsterisk: true,
    placeholder: 'Enter your Password',
    disabled: false,
  },
];

export default logininputField;
