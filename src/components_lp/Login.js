import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { UserContext } from "./Context/UserContext";
const Login = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const { email, password } = user;
      const response = await axios.post(
        "https://lcf-backend.onrender.com/api/auth/login",
        user
      );
      const { userId, token } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);

      const profileResponse = await axios.get(
        `https://lcf-backend.onrender.com/api/profiles/checkProfile/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setLoading(false);

      if (profileResponse.data.exists) {
        navigate("/home");
        window.location.reload();
      } else {
        navigate("/profileform");
      }
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.status === 401) {
        setErrorMessage("Invalid credentials.");
      } else {
        setErrorMessage("Error logging in. Please try again later.");
      }
    }
  };

  return (
    <div className="bg-black lg:flex lg:h-screen p-10 lg:items-center lg:justify-center">
      <div className="bg-white rounded-lg shadow-lg lg:w-1/3 p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-purple-500">LetsCoFound</h1>
          <p className="text-gray-600 mt-2">Explore. Connect. Collaborate.</p>
        </div>

        <form onSubmit={handleLogin} className="mt-8">
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            value={user.email}
            required
            className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            value={user.password}
            required
            className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          {errorMessage && (
            <p className="text-red-500 mb-4 text-center">{errorMessage}</p>
          )}
          <button
            type="submit"
            className="w-full p-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 flex justify-center items-center disabled:opacity-50"
            disabled={loading}
          >
            {loading ? (
              <div className="w-6 h-6 border-4 border-t-4 border-t-purple-500 border-gray-300 border-solid rounded-full animate-spin"></div>
            ) : (
              "Log In"
            )}
          </button>
        </form>

        <div className="text-center mt-4">
          <h4 className="text-gray-600">
            Don't have an account?{" "}
            <a className="text-purple-500 font-bold" href="/signup">
              Sign Up
            </a>
          </h4>
        </div>

        <div className="text-center text-sm text-gray-500 mt-6">
          By logging in, you agree to our{" "}
          <Link to="/policy">
            <span className="text-purple-500 font-bold underline">
              Privacy Policy
            </span>
            .
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
