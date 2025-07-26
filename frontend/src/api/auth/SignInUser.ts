
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

interface SigninFormData {
  email: string;
  password: string;
}

export const signinUser = async (formData: SigninFormData) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/v1/user/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Signin failed");
    }

    return data; 
  } catch (err: any) {
    console.error("Signin error:", err.message);
    throw err;
  }
};
