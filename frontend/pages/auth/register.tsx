import React, { useState } from "react";
import { useRouter } from "next/router";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: String(username),
        password: String(password),
      }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      router.push("/");
    } else {
      setError(data.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="p-8 bg-white shadow-md rounded-md"
      >
        <h2 className="text-xl mb-4">Registruj se</h2>

        <input
          type="text"
          placeholder="Username"
          className="mb-4 p-2 border rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="mb-4 p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <div className="text-red-500 mb-4">{error}</div>}

        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded"
        >
          Registruj Se
        </button>
      </form>
    </div>
  );
};
export default Register;
