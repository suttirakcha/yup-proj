import * as Yup from 'yup'

export const signupSchema = Yup.object({
  username: Yup.string().matches(/^[a-zA-Z0-9_]{5,12}$/, "Invalid username").min(3, "Username must be at least 3 characters long").required("Username is required"),
  nickname: Yup.string().min(3, ({ path, value, min }) => `${path} must be more than ${min} characters long. Characters length: ${value.length}`).max(10, ({ path, value, max }) => `${path} cannot be more than ${max} characters long. Characters length: ${value.length}`).required("Nickname is required"),
  password: Yup.string().min(6, "The password must be at least 6 characters long").required("Password is required"),
  confirm_password: Yup.string().oneOf([Yup.ref("password")], "Password does not match"),
  age: Yup.number().typeError("Age must be a number").min(14, "Age must be more than 13"),
  phone: Yup.string().matches(/^\d{10}$/, "The phone must be 10 digits"),
  terms: Yup.boolean().oneOf([true], "You have to accept the terms and condition")
})