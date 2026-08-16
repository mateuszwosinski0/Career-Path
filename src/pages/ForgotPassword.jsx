import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

function ForgotPassword() {
    const {resetPassword} = useAuth();

    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);


    async function handleSubmit(e) {
        e.preventDefault();

        setError(""),
        setMessage(""),
        setLoading(true);

        const {error} = await resetPassword(email);

        setLoading(false);

        if (error) {
            setError(error.message);
            return;
        }

        setMessage("Check your email for a password reset link.");
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-gray-950">
            <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                        Reset password
                    </h1>

                    <p className="mt-2 text-gray-500 dark:text-gray-400">
                        Enter your email and we'll send you a reset link.
                         </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <label className="flex flex-col gap-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Email
                        </span>

                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required
                        className="rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-900 outline-none transition focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                        />
                    </label>

                    {error && (
                        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600 dark:bg-red-950/30 dark:text-red-400">
                            {error}
                        </p>
                    )}

                    {message && (
                        <p className="rounded-lg bg-green-50 px-3 py-2 text-sm text-green-600 dark:bg-green-950/30 dark:text-green-400">
                            {message}
                        </p>
                    )}

                    <button type="submit" disabled={loading} className="w-full rounded-lg bg-blue-600 px-4 p-2.5 font-medium text-white hover:bg-blue-700 disabled:opacity-60">
                        {loading ? "Sending..." : "Send reset link"}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
                    Remeber your password?{" "}
                    <Link
                    to="/login" className="font-medium text-blue-600 hover:text-blue-700">
                        Sign in
                    </Link>
                </p>

            </div>
        </main>
    )
}

export default ForgotPassword;