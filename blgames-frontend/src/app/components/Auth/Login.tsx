import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("/api/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Erro ao efetuar login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b1320] text-gray-200">
      <div className="w-full max-w-md bg-[#0f1a26] p-8 rounded-lg shadow-lg border border-[#00ccff]/10">
        <h2 className="text-2xl font-semibold mb-6 text-center">Entrar</h2>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 rounded bg-[#08121a] border border-[#00ccff]/10 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 rounded bg-[#08121a] border border-[#00ccff]/10 focus:outline-none"
            />
          </div>

          {error && <div className="text-red-400 text-sm">{error}</div>}

          <div className="flex items-center justify-between">
            <button className="bg-[#00ccff] text-black px-4 py-2 rounded font-medium">
              Entrar
            </button>
            <a
              href="/register"
              className="text-sm text-[#00ccff] hover:underline"
            >
              Crie sua conta!
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
