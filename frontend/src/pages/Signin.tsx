import { Link } from "react-router-dom";
import { AuthLayout } from "../components/AuthLayout";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useSigninForm } from "../hooks/useSigninForm";
import Header from "../components/dashboard/Header";


function Signin() {
  const { form, loading, error, handleChange, handleSubmit } = useSigninForm();
  return (
    <>
    <div> <Header/>
    
    <AuthLayout title="Sign In">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email"
          name="email"
          type="email"
          required
          value={form.email}
          onChange={handleChange}
        />
        <Input
          label="Password"
          name="password"
          type="password"
          required
          value={form.password}
          onChange={handleChange}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </Button>
      </form>
      <p className="text-center text-sm text-gray-600 ">
        Don't have an account?{" "}
        <Link to="/signup" className="text-blue-600 hover:underline">
          Sign Up
        </Link>
      </p>
    </AuthLayout>
    </div>
   
    </>
  );
}

export default Signin;
