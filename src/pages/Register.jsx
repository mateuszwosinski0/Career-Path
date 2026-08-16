import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
function Register() {
    const {signUp} = useAuth();

     const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState("");
 const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        setError("");
        setLoading(true);

        if(password !== confirmPassword) {
            setError("Passwords do not match.");
            setLoading(false);
            return;
        }

        const {error} = await signUp(email,password,username);

        setLoading(false);

        if (error) {
            setError(error.message);
            return;
        }
       

        navigate("/login");
        
    }
    return (
         <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-gray-950">
            <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                        Create your account
                    </h1>

                    <p className="mt-2 text-gray-500 dark:text-gray-400">
                        Start tracking your job applications.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">

                    <label className="flex flex-col gap-2">
                        <span className="tex-sm font-medium text-gray-700 dark:text-gray-300">
                            Username
                        </span>

                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required
                        className="rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-900 outline-none transition focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                        />
                    </label>
                    <label className="flex flex-col gap-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Email
                        </span>

                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required
                        className="rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-900 outline-none transition focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"/>
                    </label>

                    <label className="flex flex-col gap-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Password
                        </span>
                        
                        <div className="relative">
  <input
    type={showPassword ? "text" : "password"}
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    required
    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 pr-10 text-gray-900 outline-none transition-colors focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
  />

  <button
    type="button"
    onClick={() => setShowPassword((current) => !current)}
    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
    aria-label={showPassword ? "Hide password" : "Show password"}
  >
    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
  </button>
</div>
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Confirm new password
            </span>

           <div className="relative">
  <input
    type={showConfirmPassword ? "text" : "password"}
    value={confirmPassword}
    onChange={(e) => setConfirmPassword(e.target.value)}
    required
    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 pr-10 text-gray-900 outline-none transition-colors focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
  />

  <button
    type="button"
    onClick={() =>
      setShowConfirmPassword((current) => !current)
    }
    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
    aria-label={
      showConfirmPassword ? "Hide password" : "Show password"
    }
  >
    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
  </button>
</div>
          </label>

                    

                    {error && (
                        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600 dark:bg-red-950/30 dark:text-red-400">
                            {error}
                        </p>
                    )}

                    <button type="submit" disabled={loading} className="w-full rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60">
                        {loading ? "Create account..." : "Create account"}
                        </button> 

                        <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
                            Already have an account?{" "}
                            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-700">
                            Sign in 
                            </Link>
                        </p>
                </form>
            </div>
        </main>
    )
}

export default Register