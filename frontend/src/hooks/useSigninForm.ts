import { useState } from "react";
import { signinUser } from "../api/auth/SignInUser";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast"; 

export const useSigninForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!form.email || !form.password) {
      const message = "Email and password are required";
      setError(message);
      toast.error(message);
      setLoading(false);
      return;
    }

    try {
      const response = await signinUser({
        email: form.email.trim(),
        password: form.password,
      });

      localStorage.setItem("token", response.jwt);
      toast.success("Signed in successfully! ✅");
      navigate("/blogs");
    } catch (err: any) {
      const message = err.message || "Something went wrong";
      setError(message);
      toast.error(message); 
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
