const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

interface SignupFormData {
  username: string;
  email: string;
  password: string;
}

export const signupUser = async (formData: SignupFormData) => {
  const res = await fetch(`${BACKEND_URL}/api/v1/user/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: formData.username,
      email: formData.email,
      password: formData.password,
    }),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.error || "Signup failed");

  return data;
};
