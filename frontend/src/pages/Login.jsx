import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

import { useAuth } from "../context/AuthContext";

export default function Login() {
    const { login, user } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Email and password are required");
            toast.error("Email and password are required");
            return;
        }

        try {
            setLoading(true);

            const loggedInUser = await login({ email, password });

            toast.success("Login successful!");

            if (loggedInUser.role === "ADMIN") {
                navigate("/admin/dashboard");
            } else {
                navigate("/member/dashboard");
            }
        } catch (err) {
            const msg = err?.response?.data?.message || "Login failed";
            setError(msg);
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user) {
            if (user.role === "ADMIN") {
                navigate("/admin/dashboard");
            } else {
                navigate("/member/dashboard");
            }
        }
    }, [user, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-dark">
            <button
                onClick={() => navigate("/")}
                className="absolute top-6 left-6 flex items-center gap-2 text-sm font-medium text-text-dark bg-buttonColor border border-border px-3 py-1.5 rounded-md hover:bg-light transition"
            >
                Back To Home
            </button>

            <div className="w-full max-w-md bg-offWhite rounded-xl shadow-xl px-8 py-10 border border-border">
                <h1 className="text-2xl font-bold text-center text-text-dark">
                    Welcome Back
                </h1>
                <p className="text-sm text-center text-text-muted mt-1">
                    Login to continue to your dashboard
                </p>

                {error && (
                    <div className="mt-4 text-sm text-muted bg-danger/70 border border-border px-3 py-2 rounded-md">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-text-dark">
                            Email address
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="w-full rounded-md border border-border bg-light px-3 py-2.5 text-sm text-text-dark placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-text-dark">
                            Password
                        </label>

                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full rounded-md border border-border bg-light px-3 py-2.5 pr-10 text-sm text-text-dark placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-dark"
                            >
                                {showPassword ? (
                                    <FaRegEyeSlash size={20} />
                                ) : (
                                    <FaRegEye size={20} />
                                )}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary text-text-light py-2.5 rounded-md font-medium transition hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
}
