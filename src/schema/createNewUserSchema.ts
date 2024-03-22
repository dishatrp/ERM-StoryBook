import * as yup from "yup";

const createNewUserSchema = [
  yup.object().shape(
    {
      userFName: yup
        .string()
        .required()
        .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ")
        .trim("Firstname cannot include leading and trailing spaces")
        .strict(true)
        .label("First Name"),

      userLName: yup
        .string()
        .required()
        .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ")
        .trim("Lastname cannot include leading and trailing spaces")
        .strict(true)
        .label("Last Name"),

      userContactNumber: yup
        .string()
        .required()
        .label("Contact Number")
        .matches(/^\d{10}$/, "Phone number must be exactly 10 digits"),

      userName: yup
        .string()
        .min(4)
        .max(20)
        .trim("Username cannot include leading and trailing spaces")
        .strict(true)
        .required()
        .label("Username"),

      clientId: yup.mixed().nullable().label("client Id"),

      policyId: yup.string().nullable().label("Permission Policy"),

      endDate: yup.date().required().label("End Date"),

      userEmail: yup
        .string()
        .matches(
          /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
          "Email is not valid"
        )
        .required()
        .label("Email"),

      password: yup
        .string()
        .min(8)
        .required()
        .label("Password")
        .trim("Password cannot include leading and trailing spaces")
        .test(
          "no-spaces-between-words",
          "Spaces between words are not allowed",
          (value: any) => !/\s/.test(value)
        )
        .strict(true),

      passwordConfirm: yup
        .string()
        .test("passwords-match", "Passwords must match", function (value) {
          return this.parent.password === value;
        }),
    }

  ),
  yup.object().shape({}),
];

export default createNewUserSchema;
