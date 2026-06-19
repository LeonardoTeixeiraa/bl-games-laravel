import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export default function GameDetail() {
  const [game, setGame] = useState<any | null>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [commentText, setCommentText] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState("");

  const path = typeof window !== "undefined" ? window.location.pathname : "";
  const id = path.split("/jogo/")[1] || path.split("/game/")[1] || null;

  useEffect(() => {
    if (!id) return;

    // Buscar lista de jogos e encontrar pelo id (API não possui rota /jogos/{id})
    axios
      .get("http://localhost:8000/api/jogos")
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : res.data.data || [];
        const found = data.find((g: any) => String(g.id) === String(id));
        if (found) {
          found.imagem_url = found.imagem_url; // já vem transformada pelo backend
          setGame(found);
        }
      })
      .catch((err) => console.error("Erro ao carregar jogo:", err));

    // carregar comentários locais (fallback se backend não expor endpoints)
    const saved =
      typeof window !== "undefined"
        ? localStorage.getItem(`comments_jogo_${id}`)
        : null;
    setComments(saved ? JSON.parse(saved) : []);
  }, [id]);

  const submitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const usuarioDados =
      typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("usuario_dados") || "null")
        : null;

    const newComment = {
      id: Date.now(),
      name: usuarioDados?.name || "Anônimo",
      userId: usuarioDados?.id || null,
      text: commentText.trim(),
      date: new Date().toISOString(),
      // marca como local até existir integração com backend
      isLocal: true,
    };

    const updated = [newComment, ...comments];
    setComments(updated);
    localStorage.setItem(`comments_jogo_${id}`, JSON.stringify(updated));
    setCommentText("");
  };

  const deleteComment = async (c: any) => {
    const usuarioDados =
      typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("usuario_dados") || "null")
        : null;

    // apenas autor pode deletar localmente
    if (c.userId && usuarioDados && c.userId !== usuarioDados.id) return;

    // se comentário existir no backend e temos token, chamar DELETE
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (c.avaliacao_id && token) {
      try {
        await axios.delete(
          `http://localhost:8000/api/avaliacoes/${c.avaliacao_id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
      } catch (err) {
        console.error("Erro ao deletar avaliação no servidor", err);
        // continuar removendo localmente mesmo com erro de rede
      }
    }

    const updated = comments.filter((cm) => cm.id !== c.id);
    setComments(updated);
    if (typeof window !== "undefined")
      localStorage.setItem(`comments_jogo_${id}`, JSON.stringify(updated));
  };

  const startEdit = (c: any) => {
    setEditingId(c.id);
    setEditingText(c.text || "");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingText("");
  };

  const saveEdit = async (c: any) => {
    const usuarioDados =
      typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("usuario_dados") || "null")
        : null;
    if (c.userId && usuarioDados && c.userId !== usuarioDados.id) return;

    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (c.avaliacao_id && token) {
      try {
        await axios.put(
          `http://localhost:8000/api/avaliacoes/${c.avaliacao_id}`,
          { comentario: editingText },
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
      } catch (err) {
        console.error("Erro ao atualizar avaliação no servidor", err);
      }
    }

    const updated = comments.map((cm) =>
      cm.id === c.id ? { ...cm, text: editingText } : cm,
    );
    setComments(updated);
    if (typeof window !== "undefined")
      localStorage.setItem(`comments_jogo_${id}`, JSON.stringify(updated));
    cancelEdit();
  };

  if (!id) return <div>Jogo inválido.</div>;

  return (
    <div className="min-h-screen bg-[#171a21] text-gray-200 font-['Roboto']">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-10">
        {!game ? (
          <div className="text-center py-20">Carregando jogo...</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="col-span-2">
              <div className="relative w-full h-96 bg-[#0f1a26] rounded overflow-hidden border border-[#00ccff]/10">
                <img
                  src={game.imagem_url}
                  alt={game.nome}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 text-white bg-black/40 px-4 py-2 rounded">
                  <h1 className="text-2xl font-bold font-['Montserrat']">
                    {game.nome}
                  </h1>
                </div>
              </div>

              <div className="mt-6 text-gray-300">
                <h2 className="text-xl font-semibold mb-2">Descrição</h2>
                <p className="text-sm leading-relaxed">
                  {game.descricao || "Sem descrição disponível."}
                </p>
              </div>

              {/* Comentários */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-3">Comentários</h3>
                <form onSubmit={submitComment} className="space-y-2">
                  <input
                    placeholder="Comentar"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-[#0f1a26] border border-[#00ccff]/10 text-gray-200"
                  />
                  <div>
                    <button
                      type="submit"
                      className="bg-[#00ccff] text-black px-4 py-2 rounded font-medium"
                    >
                      Enviar
                    </button>
                  </div>
                </form>

                <div className="mt-6 space-y-4">
                  {comments.length === 0 && (
                    <div className="text-sm text-gray-400">
                      Ainda não há comentários.
                    </div>
                  )}
                  {comments.map((c) => {
                    const usuarioDados =
                      typeof window !== "undefined"
                        ? JSON.parse(
                            localStorage.getItem("usuario_dados") || "null",
                          )
                        : null;
                    const podeEditar =
                      usuarioDados && c.userId && usuarioDados.id === c.userId;

                    return (
                      <div
                        key={c.id}
                        className="bg-[#0f1a26] p-4 rounded border border-[#00ccff]/10"
                      >
                        <div className="flex items-center justify-between">
                          <div className="font-medium text-white">{c.name}</div>
                          <div className="text-xs text-gray-400">
                            {new Date(c.date).toLocaleString()}
                          </div>
                        </div>

                        {editingId === c.id ? (
                          <div className="mt-2">
                            <textarea
                              value={editingText}
                              onChange={(e) => setEditingText(e.target.value)}
                              className="w-full px-3 py-2 rounded bg-[#08121a] border border-[#00ccff]/10 text-gray-200"
                            />
                            <div className="mt-2 flex gap-2">
                              <button
                                onClick={() => saveEdit(c)}
                                className="bg-[#00ccff] text-black px-3 py-1 rounded"
                              >
                                Salvar
                              </button>
                              <button
                                onClick={cancelEdit}
                                className="bg-transparent border border-[#00ccff]/20 text-sm px-3 py-1 rounded"
                              >
                                Cancelar
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="mt-2 text-sm text-gray-200">
                              {c.text}
                            </div>
                            {podeEditar && (
                              <div className="mt-3 flex gap-2">
                                <button
                                  onClick={() => startEdit(c)}
                                  className="text-sm text-[#00ccff] hover:underline"
                                >
                                  Editar
                                </button>
                                <button
                                  onClick={() => deleteComment(c)}
                                  className="text-sm text-red-400 hover:underline"
                                >
                                  Excluir
                                </button>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <aside className="col-span-1">
              <div className="bg-[#0f1a26] p-6 rounded border border-[#00ccff]/10">
                <h4 className="text-lg font-semibold mb-3">Informações</h4>
                <div className="text-sm text-gray-300 space-y-2">
                  <div>
                    <strong className="text-gray-400">Plataforma:</strong>{" "}
                    <span className="text-white">{game.plataforma || "—"}</span>
                  </div>
                  <div>
                    <strong className="text-gray-400">Gênero:</strong>{" "}
                    <span className="text-white">
                      {game.genero || game.category || "—"}
                    </span>
                  </div>
                  <div>
                    <strong className="text-gray-400">Desenvolvedora:</strong>{" "}
                    <span className="text-white">
                      {game.desenvolvedora || "—"}
                    </span>
                  </div>
                  <div>
                    <strong className="text-gray-400">Classificação:</strong>{" "}
                    <span className="text-white">
                      {game.classificacao || "—"}
                    </span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
