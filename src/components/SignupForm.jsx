import { useState, useRef } from "react"
import { signupSchema } from "../schemas/signupSchema";
import { yupToFormErrors } from "../utils/yupToFormErrors";

export default function SignupForm() {
  const styles = {
    input: "border border-1 rounded-lg px-2 py-1",
    space: "flex gap-2 items-center",
    textError: "text-red-500"
  }

  const [form, setForm] = useState({
    username: "",
    nickname: "",
    password: "",
    confirm_password: "",
    age: undefined,
    phone: "",
    terms: false
  })

  const [errors, setErrors] = useState({});
  const refs = {
    username: useRef(null),
    nickname: useRef(null),
    password: useRef(null),
    confirm_password: useRef(null),
    age: useRef(null),
    phone: useRef(null),
    terms: useRef(null),
  }

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    const isCheckbox = type === "checkbox";
    setForm(prev => ({ ...prev, [name]: (isCheckbox ? checked : value) }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signupSchema.validate(form, { abortEarly: false });
      // const isFormValid = await signupSchema.isValid(form, { abortEarly: false });
      alert("Registered!");
      console.log(form);
      setErrors({})
    } catch (err){
      const errorObj = yupToFormErrors(err, refs);
      setErrors(errorObj)
    }
  }

  return (
    <>
      <p className="text-2xl font-bold pb-10">Sign up</p>
      <form onSubmit={handleSubmit} className="space-y-2">
        <div className={styles.space}>
          <label>Username</label>
          <input 
            className={styles.input} 
            type="text" 
            name="username" 
            value={form.username}
            onChange={handleChange}
            ref={refs.username}
          />
          {errors.username && <p className={styles.textError}>{errors.username}</p>}
        </div>
        <div className={styles.space}>
          <label>Nickname</label>
          <input 
            className={styles.input} 
            type="text" 
            name="nickname" 
            value={form.nickname}
            onChange={handleChange}
            ref={refs.nickname}
          />
          {errors.nickname && <p className={styles.textError}>{errors.nickname}</p>}
        </div>
        <div className={styles.space}>
          <label>Password</label>
          <input 
            className={styles.input} 
            type="password" 
            name="password" 
            value={form.password}
            onChange={handleChange}
            ref={refs.password}
          />
          {errors.password && <p className={styles.textError}>{errors.password}</p>}
        </div>
        <div className={styles.space}>
          <label>Confirm Password</label>
          <input 
            className={styles.input} 
            type="password" 
            name="confirm_password"
            value={form.confirm_password}
            onChange={handleChange}
            ref={refs.confirm_password}
          />
          {errors.confirm_password && <p className={styles.textError}>{errors.confirm_password}</p>}
        </div>
        <div className={styles.space}>
          <label>Age</label>
          <input 
            className={styles.input} 
            type="text" 
            name="age" 
            value={form.age}
            onChange={handleChange}
            ref={refs.age}
          />
          {errors.age && <p className={styles.textError}>{errors.age}</p>}
        </div>
        <div className={styles.space}>
          <label>Phone</label>
          <input 
            className={styles.input} 
            type="tel" 
            name="phone" 
            value={form.phone}
            onChange={handleChange}
            ref={refs.phone}
          />
          {errors.phone && <p className={styles.textError}>{errors.phone}</p>}
        </div>
        <div className={styles.space}>
          <label>Terms and Conditions</label>
          <input 
            type="checkbox" 
            name="terms" 
            checked={form.terms}
            onChange={handleChange}
            ref={refs.terms}
          />
          {errors.terms && <p className={styles.textError}>{errors.terms}</p>}
        </div>
        <button type="submit">Register</button>
      </form>
    </>
  )
}
