import * as Yup from "yup"

export const loginSchema = Yup.object({
  email: Yup.string().email("Invalid email").required(`Please enter your email`),
  password: Yup.string().min(6, ({ path, value }) => `Your ${path} must be at least 6 characters long, there ${value.length === 1 ? "is" : "are"} only ${value.length} character${value.length === 1 ? "" : "s"}`).required("Please enter your password"),
  day: Yup.number().typeError("Day must be a number").min(1, "Date cannot be zero or negative").max(31, "Date must be between 1-31").required("Please enter the day"),
  age: Yup.number().typeError("Age must be a number").min(11, "Your age must be more than 10").required("Please enter your age")
})