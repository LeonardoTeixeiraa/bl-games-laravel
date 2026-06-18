import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("/api/register", { name, email, password });

      // Salva o token de autenticação
      localStorage.setItem("token", res.data.token);

      // Salva os dados completos do usuário (incluindo is_admin)
      localStorage.setItem("usuario_dados", JSON.stringify(res.data.user));

      // Dispara evento customizado para Navbar atualizar
      document.dispatchEvent(new Event("user-login"));

      // Redireciona para home ao invés de login
      window.location.href = "/";
    } catch (err: any) {
      setError(err?.response?.data?.message || "Erro ao cadastrar");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b1320] text-gray-200">
      <div className="w-full max-w-md bg-[#0f1a26] p-8 rounded-lg shadow-lg border border-[#00ccff]/10">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Crie sua conta
        </h2>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Nome de usuário</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2 rounded bg-[#08121a] border border-[#00ccff]/10 focus:outline-none"
            />
          </div>

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
              Cadastrar
            </button>
            <a href="/login" className="text-sm text-[#00ccff] hover:underline">
              Já tenho conta
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
