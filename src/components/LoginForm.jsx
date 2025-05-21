import { useState } from "react"
import { loginSchema } from "../schemas/loginSchema";
import { yupToFormErrors } from "../utils/yupToFormErrors";

export default function LoginForm() {
  const styles = {
    input: "border border-1 rounded-lg px-2 py-1",
    space: "flex gap-2 items-center",
    textError: "text-red-500"
  }

  const [form, setForm] = useState({
    email: "",
    password: "",
    day: "",
    age: ""
  })

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginSchema.validate(form, { abortEarly: false });
      alert("Registered!", form);
      setErrors({})
    } catch (err){
      const errorObj = yupToFormErrors(err);
      setErrors(errorObj)
    }
  }

  return (
    <>
      <p className="text-2xl font-bold pb-10">Log in</p>
      <form className="space-y-2" onSubmit={handleSubmit}>
        <div className={styles.space}>
          <label>Email</label>
          <input 
            className={styles.input} 
            type="email" 
            name="email" 
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && <p className={styles.textError}>{errors.email}</p>}
        </div>
        <div className={styles.space}>
          <label>Password</label>
          <input 
            className={styles.input} 
            type="password" 
            name="password" 
            value={form.password}
            onChange={handleChange}
          />
          {errors.password && <p className={styles.textError}>{errors.password}</p>}
        </div>
        <div className={styles.space}>
          <label>Day</label>
          <input 
            className={styles.input} 
            type="text" 
            name="day" 
            value={form.day}
            onChange={handleChange}
          />
          {errors.day && <p className={styles.textError}>{errors.day}</p>}
        </div>
        <div className={styles.space}>
          <label>Age</label>
          <input 
            className={styles.input} 
            type="text" 
            name="age" 
            value={form.age}
            onChange={handleChange}
          />
          {errors.age && <p className={styles.textError}>{errors.age}</p>}
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  )
}
