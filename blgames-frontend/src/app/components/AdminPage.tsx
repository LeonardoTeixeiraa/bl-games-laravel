import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export default function AdminPage() {
  const [games, setGames] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);

  const [form, setForm] = useState<any>({
    nome: "",
    plataforma: "",
    genero: "",
    desenvolvedora: "",
    classificacao: "",
    descricao: "",
    categoria_id: "",
    imagem_file: null,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:8000/api/jogos");
      setGames(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Deseja realmente excluir este jogo?")) return;
    try {
      await axios.delete(`http://localhost:8000/api/jogos/${id}`);
      setGames(games.filter((g) => g.id !== id));
    } catch (err) {
      console.error(err);
      alert("Erro ao excluir jogo");
    }
  };

  const handleEdit = (game: any) => {
    setEditing(game);
    setForm({
      nome: game.nome || "",
      plataforma: game.plataforma || "",
      genero: game.genero || "",
      desenvolvedora: game.desenvolvedora || "",
      classificacao: game.classificacao || "",
      descricao: game.descricao || "",
      categoria_id: game.categoria_id || "",
      imagem_file: null,
    });
    setImagePreview(game.imagem_url ?? null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const validateFileType = (file: File) => {
    const allowed = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    return allowed.includes(file.type);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("nome", form.nome);
    fd.append("plataforma", form.plataforma);
    fd.append("genero", form.genero);
    fd.append("desenvolvedora", form.desenvolvedora);
    fd.append("classificacao", form.classificacao);
    fd.append("descricao", form.descricao);
    fd.append("categoria_id", form.categoria_id);
    if (form.imagem_file) fd.append("imagem_url", form.imagem_file);

    try {
      if (editing) {
        fd.append("_method", "PUT");

        await axios.post(`http://localhost:8000/api/jogos/${editing.id}`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Jogo atualizado com sucesso");
      } else {
        await axios.post("http://localhost:8000/api/jogos", fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Jogo criado com sucesso");
      }
      setForm({
        nome: "",
        plataforma: "",
        genero: "",
        desenvolvedora: "",
        classificacao: "",
        descricao: "",
        categoria_id: "",
        imagem_file: null,
      });
      setEditing(null);
      load();
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar jogo");
    }
  };

  return (
    <div className="min-h-screen bg-[#171a21] text-white">
      <Navbar />

      <main className="max-w-5xl mx-auto p-6 pt-24 pb-24">
        <h1 className="text-3xl font-bold mb-4">Administração de Jogos</h1>

        <section className="bg-[#16202d] p-6 rounded-lg mb-6 border border-cyan-500/20">
          <h2 className="text-xl font-bold mb-4">
            Formulário de cadastro / edição
          </h2>

          <form onSubmit={handleSubmit} className="grid gap-3">
            <label className="text-sm text-gray-200">Nome</label>
            <input
              className="p-3 rounded bg-[#1b2838] text-white"
              placeholder="Nome"
              value={form.nome}
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
            />

            <label className="text-sm text-gray-200">Plataforma</label>
            <input
              className="p-3 rounded bg-[#1b2838] text-white"
              placeholder="Plataforma"
              value={form.plataforma}
              onChange={(e) => setForm({ ...form, plataforma: e.target.value })}
            />

            <label className="text-sm text-gray-200">Gênero</label>
            <input
              className="p-3 rounded bg-[#1b2838] text-white"
              placeholder="Gênero"
              value={form.genero}
              onChange={(e) => setForm({ ...form, genero: e.target.value })}
            />

            <label className="text-sm text-gray-200">Desenvolvedora</label>
            <input
              className="p-3 rounded bg-[#1b2838] text-white"
              placeholder="Desenvolvedora"
              value={form.desenvolvedora}
              onChange={(e) =>
                setForm({ ...form, desenvolvedora: e.target.value })
              }
            />

            <label className="text-sm text-gray-200">Classificação</label>
            <input
              className="p-3 rounded bg-[#1b2838] text-white"
              placeholder="Classificação"
              value={form.classificacao}
              onChange={(e) =>
                setForm({ ...form, classificacao: e.target.value })
              }
            />

            <label className="text-sm text-gray-200">Descrição</label>
            <textarea
              className="p-3 rounded bg-[#1b2838] text-white"
              placeholder="Descrição"
              value={form.descricao}
              onChange={(e) => setForm({ ...form, descricao: e.target.value })}
            />

            <label className="text-sm text-gray-200">Categoria ID</label>
            <input
              className="p-3 rounded bg-[#1b2838] text-white"
              placeholder="Categoria ID"
              value={form.categoria_id}
              onChange={(e) =>
                setForm({ ...form, categoria_id: e.target.value })
              }
            />

            <div className="mt-2">
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Imagem do jogo (png, jpeg, jpg, webp)
              </label>
              <div className="flex items-center gap-3">
                <label className="inline-flex items-center px-4 py-2 bg-[#0f1720] border border-dashed border-cyan-500/30 rounded cursor-pointer hover:bg-[#0b1418]">
                  <input
                    type="file"
                    className="hidden"
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                    onChange={(e) => {
                      const f = e.target.files?.[0] ?? null;
                      if (f && !validateFileType(f)) {
                        alert("Formato de imagem não permitido");
                        e.currentTarget.value = "";
                        return;
                      }
                      if (f) {
                        setForm({ ...form, imagem_file: f });
                        const url = URL.createObjectURL(f);
                        setImagePreview(url);
                      } else {
                        setForm({ ...form, imagem_file: null });
                        setImagePreview(null);
                      }
                    }}
                  />
                  <span className="text-sm text-[#00ccff] font-medium">
                    Escolher arquivo
                  </span>
                </label>

                <div className="text-sm text-gray-300">
                  {form.imagem_file
                    ? form.imagem_file.name
                    : imagePreview
                      ? "Pré-visualização disponível"
                      : "Nenhum arquivo selecionado"}
                </div>
              </div>

              {imagePreview && (
                <div className="mt-3">
                  <img
                    src={imagePreview}
                    alt="preview"
                    className="w-48 h-28 object-cover rounded-md border border-cyan-500/10"
                  />
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <button
                className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-4 py-2 rounded"
                type="submit"
              >
                {editing ? "Salvar" : "Adicionar jogo"}
              </button>
              {editing && (
                <button
                  type="button"
                  onClick={() => {
                    setEditing(null);
                    setForm({
                      nome: "",
                      plataforma: "",
                      genero: "",
                      desenvolvedora: "",
                      classificacao: "",
                      descricao: "",
                      categoria_id: "",
                      imagem_file: null,
                    });
                    setImagePreview(null);
                  }}
                  className="bg-gray-600 px-4 py-2 rounded"
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">Jogos cadastrados</h2>
          {loading ? (
            <p>Carregando...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {games.map((g) => (
                <div
                  key={g.id}
                  className="bg-[#16202d] p-3 rounded flex items-center justify-between border border-cyan-500/10"
                >
                  <div>
                    <div className="font-bold">{g.nome}</div>
                    <div className="text-sm text-gray-400">{g.genero}</div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(g)}
                      className="bg-yellow-500 px-3 py-1 rounded text-black"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(g.id)}
                      className="bg-red-500 px-3 py-1 rounded text-white"
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
