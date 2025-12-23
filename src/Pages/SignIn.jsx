import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { signIn } from "../lib/auth";
import { useAuth } from "../context/AuthContext";

export const SignIn = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  // const [success, setSuccess] = useState();
    const authIfo = useAuth()
  console.log({ authIfo })

  const navigate = useNavigate()

  const handleSubmit = async (event) => {
        event.preventDefault();

    setIsLoading(true)
    setError(null)

    try {

      await signIn(email, password);

      navigate('/')

    } catch (error) {
      setError(error.message || "Failed to sign in . Please check your credentials.")
      console.log("error", error)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className="min-h-screen bg-gray-50 px-4 flex items-center justify-center">
      <div className="max-w-md w-full">
        <div className="text-center my-8">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-gray-600 mt-1">Sign in To Access Your Account</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-8 mb-6">

            {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Your Email:
              </label>
              <input
                type="emial"
                value={email}
                placeholder="your@email.com"
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-orange-500"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="userName"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Password:
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="....."
                required
                minLength={6}
                className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-orange-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                must be at least 6 characters
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-orange-700 px-4 py-3 text-orange-50 rounded-md  font-bold focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200 "
              disabled={isLoading}
            >
              {isLoading ? "Signing In ..." : "Sign In"}
            </button>
          </form>
          <div className="text-center mt-6">
            <p className="text-gray-600 text-sm">
              Don`t have an account?{""}
              <Link
                to="/signup"
                className="font-semibold text-orange-600 hover:text-orange-800"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
