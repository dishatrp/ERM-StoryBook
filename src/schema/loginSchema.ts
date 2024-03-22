import * as yup from 'yup';

const loginSchema: any = [
  yup.object().shape({
    username: yup
      .string()
      .min(5)
      .trim('username cannot include leading and trailing spaces')
      .test('no-spaces-between-words', 'Spaces between words are not allowed', (value: any) => !/\s/.test(value))
      .strict(true)
      .required(),
    password: yup.string().min(6).required(),
  }),
  yup.object().shape({
    client: yup.string().required(),
  }),
];

export default loginSchema;
