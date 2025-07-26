import { AuthLayout } from "../components/AuthLayout"
import { Button } from "../components/Button"
import Header from "../components/dashboard/Header";
import { Input } from "../components/Input"
import { useSignupForm } from "../hooks/useSignupForm";

function Signup() {
  
  const { form, loading, error, handleChange, handleSubmit } = useSignupForm();
  return (
    <>
    
    <Header/>
    <AuthLayout title="Sign Up">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Username"
          name="username"
          type="text"
          required
          value={form.username}
          onChange={handleChange}
        />
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
          {loading ? "Creating..." : "Create Account"}
        </Button>
      </form>
      <p className="text-center text-sm text-gray-600 ">
        Already have an account?{" "}
        <a href="/signin" className="text-blue-600 hover:underline">
          Sign In
        </a>
      </p>
    </AuthLayout>
    
    </>
  )
}

export default Signup
