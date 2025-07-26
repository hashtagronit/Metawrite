import { useState } from "react";
import { signupUser } from "../api/auth/SignUpUser";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export const useSignupForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { username, email, password } = form;

    if (!username || !email || !password) {
      const msg = "All fields are required";
      toast.error(msg);
      setError(msg);
      setLoading(false);
      return;
    }

    try {
      const response = await signupUser(form);
      console.log("Signup success:", response);
      toast.success("Account created successfully!");
      navigate("/signin");
    } catch (err: any) {
      const msg = err.message || "Something went wrong";
      toast.error(msg);
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    loading,
    error,
    handleChange,
    handleSubmit,
  };
};
