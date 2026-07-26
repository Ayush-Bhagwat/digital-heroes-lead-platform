import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../services/api";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);

      toast.success("Login Successful");

      navigate("/dashboard");

    } catch (err) {
      toast.error(
        err.response?.data?.message || "Login Failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-96"
      >

        <h1 className="text-3xl font-bold mb-6">
          Login
        </h1>

        <input
          className="border p-3 w-full mb-4 rounded"
          placeholder="Email"
          name="email"
          onChange={handleChange}
        />

        <input
          className="border p-3 w-full mb-4 rounded"
          placeholder="Password"
          name="password"
          type="password"
          onChange={handleChange}
        />

        <button
          className="bg-blue-600 text-white w-full py-3 rounded"
        >
          Login
        </button>

        <p className="mt-5 text-center">

          No account?

          <Link
            className="text-blue-600 ml-2"
            to="/register"
          >
            Register
          </Link>

        </p>

      </form>

    </div>
  );
}