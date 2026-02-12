import { useState } from "react";

export default function Form() {
  const [formdata, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    gender: "",
    role: "Student",
    acceptTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: fieldValue,
    }));

    // Validate only the field being changed
    let fieldError = "";
    if (name === "name" && !fieldValue.trim()) fieldError = "Name is required";
    if (name === "email" && !fieldValue.trim()) fieldError = "Email is required";
    if (name === "password" && !fieldValue.trim()) fieldError = "Password is required";
    if (name === "age" && !fieldValue) fieldError = "Age is required";
    if (name === "age" && fieldValue < 1) fieldError = "You must be older than 0";
    if (name === "gender" && !fieldValue) fieldError = "Please select a gender";
    if (name === "acceptTerms" && !fieldValue) fieldError = "You must accept the terms";

    setErrors((prev) => ({
      ...prev,
      [name]: fieldError,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    let newErrors = {};
    if (!formdata.name.trim()) newErrors.name = "Name is required";
    if (!formdata.email.trim()) newErrors.email = "Email is required";
    if (!formdata.password.trim()) newErrors.password = "Password is required";    
    if (formdata.age < 1 && formdata.age !== null) newErrors.age = "You must be older than 0";
    if (!formdata.age) newErrors.age = "Age is required";
    if (!formdata.gender) newErrors.gender = "Please select a gender";
    if (!formdata.acceptTerms) newErrors.acceptTerms = "You must accept the terms";

    if (
      !formdata.name.trim() ||
      !formdata.email.trim() ||
      !formdata.password.trim() ||
      !formdata.age ||
      formdata.age < 1 ||
      !formdata.gender ||
      !formdata.acceptTerms
    ) {
      newErrors.all = "All fields are required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted:", formdata);
      setSubmittedData(formdata);
    }
  }

  return (
    <>
    
      <form className="form-container" onSubmit={handleSubmit}>
        <h3>Registration Form</h3>
        <label>
          Name:
          <input type="text" name="name" value={formdata.name} onChange={handleChange} />
          {errors.name && <span style={{ color: "red" }}>{errors.name}</span>}
        </label>

        <label>
          Email:
          <input type="email" name="email" value={formdata.email} onChange={handleChange} />
          {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}
        </label>

        <label>
          Password:
          <input type="password" name="password" value={formdata.password} onChange={handleChange} />
          {errors.password && <span style={{ color: "red" }}>{errors.password}</span>}
        </label>

        <label>
          Age:
          <input type="number" name="age" value={formdata.age} onChange={handleChange} />
          {errors.age && <span style={{ color: "red" }}>{errors.age}</span>}
        </label>

        <label>
          <input
            type="radio"
            name="gender"
            value="male"
            checked={formdata.gender === "male"}
            onChange={handleChange}
          />
          Male
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="female"
            checked={formdata.gender === "female"}
            onChange={handleChange}
          />
          Female
        </label>
        {errors.gender && <span style={{ color: "red" }}>{errors.gender}</span>}

        <label>
          Role:
          <select name="role" value={formdata.role} onChange={handleChange}>
            <option>Student</option>
            <option>Teacher</option>
            <option>Admin</option>
          </select>
        </label>

        <label>
          Accept Terms:
          <input
            type="checkbox"
            name="acceptTerms"
            checked={formdata.acceptTerms}
            onChange={handleChange}
          />
          {errors.acceptTerms && <span style={{ color: "red" }}>{errors.acceptTerms}</span>}
        </label>

        <button>Submit</button>
        {errors.all && (
          <span style={{ color: "red", display: "block", marginTop: "10px" }}>
            {errors.all}
          </span>
        )}
      </form>

{submittedData && (
  <div className="submitted-data">
    <h3>Submitted Data:</h3>
    <p><strong>Name:</strong> {submittedData.name}</p>
    <p><strong>Email:</strong> {submittedData.email}</p>
    <p><strong>Password:</strong> {submittedData.password}</p>
    <p><strong>Age:</strong> {submittedData.age}</p>
    <p><strong>Gender:</strong> {submittedData.gender}</p>
    <p><strong>Role:</strong> {submittedData.role}</p>
    <p><strong>Accepted Terms:</strong> {submittedData.acceptTerms ? "Yes" : "No"}</p>
  </div>
)}
    </>
  );
}