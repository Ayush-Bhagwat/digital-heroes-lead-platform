import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../services/api";

export default function Register() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "member",
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

      await api.post("/auth/register", form);

      toast.success("Registration Successful");

      navigate("/login");

    } catch (err) {

      toast.error(
        err.response?.data?.message || "Registration Failed"
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
          Register
        </h1>

        <input
          className="border p-3 w-full mb-4 rounded"
          placeholder="Name"
          name="name"
          onChange={handleChange}
        />

        <input
          className="border p-3 w-full mb-4 rounded"
          placeholder="Email"
          name="email"
          onChange={handleChange}
        />

        <input
          className="border p-3 w-full mb-4 rounded"
          placeholder="Password"
          type="password"
          name="password"
          onChange={handleChange}
        />

        <select
          name="role"
          onChange={handleChange}
          className="border p-3 w-full mb-4 rounded"
        >
          <option value="member">Member</option>
          <option value="admin">Admin</option>
        </select>

        <button
          className="bg-green-600 text-white w-full py-3 rounded"
        >
          Register
        </button>

        <p className="mt-5 text-center">

          Already have an account?

          <Link
            className="text-blue-600 ml-2"
            to="/login"
          >
            Login
          </Link>

        </p>

      </form>

    </div>

  );
}