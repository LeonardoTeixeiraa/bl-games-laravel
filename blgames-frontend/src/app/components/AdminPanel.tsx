import { useState } from "react";

export function AdminPanel({ games, setGames }: any) {
  const [editingGame, setEditingGame] = useState<any>(null);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");

  const addGame = () => {
    if (!title) return;

    const newGame = {
      id: Date.now(),
      title,
      image,
      category,
      price,
      discount: 0,
      rating: 100,
    };

    setGames([...games, newGame]);

    setTitle("");
    setImage("");
    setCategory("");
    setPrice("");
  };

  const deleteGame = (id: number) => {
    setGames(games.filter((game: any) => game.id !== id));
  };

  return (
    <div className="bg-[#16202d] p-6 rounded-xl mb-8 border border-cyan-500/20">

      <h2 className="text-white text-2xl font-bold mb-6">
        Painel Administrativo
      </h2>

      {/* ADICIONAR JOGO */}
      <div className="grid gap-3 mb-8">

        <input
          placeholder="Nome do jogo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-3 rounded bg-[#1b2838] text-white border border-cyan-500/20"
        />

        <input
          placeholder="URL da imagem"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="p-3 rounded bg-[#1b2838] text-white border border-cyan-500/20"
        />

        <input
          placeholder="Categoria"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-3 rounded bg-[#1b2838] text-white border border-cyan-500/20"
        />

        <input
          placeholder="Preço"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="p-3 rounded bg-[#1b2838] text-white border border-cyan-500/20"
        />

        <button
          onClick={addGame}
          className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold p-3 rounded transition"
        >
          Adicionar Jogo
        </button>

      </div>

      {/* LISTA DOS JOGOS */}
      <div className="space-y-3">

        {games.map((game: any) => (
          <div
            key={game.id}
            className="flex items-center justify-between bg-[#1b2838] p-4 rounded-lg border border-cyan-500/10"
          >
            <div className="flex items-center gap-4">

              <img
                src={game.image}
                alt={game.title}
                className="w-16 h-16 object-cover rounded"
              />

              <div>
                <h3 className="text-white font-bold">
                  {game.title}
                </h3>

                <p className="text-gray-400 text-sm">
                  {game.category}
                </p>

                <p className="text-cyan-400 text-sm">
                  {game.price}
                </p>
              </div>

            </div>

            <div className="flex gap-2">

              <button
                onClick={() => setEditingGame(game)}
                className="bg-yellow-500 hover:bg-yellow-400 px-4 py-2 rounded text-black font-bold transition"
              >
                Editar
              </button>

              <button
                onClick={() => deleteGame(game.id)}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white font-bold transition"
              >
                Excluir
              </button>

            </div>
          </div>
        ))}

      </div>

      {/* PAINEL DE EDIÇÃO */}
      {editingGame && (
        <div className="mt-8 bg-[#1b2838] p-6 rounded-xl border border-cyan-500/30">

          <h3 className="text-white text-xl font-bold mb-4">
            Editando: {editingGame.title}
          </h3>

          <div className="grid gap-3">

            <img
              src={editingGame.image}
              alt={editingGame.title}
              className="w-48 h-48 object-cover rounded-lg border border-cyan-500/20"
            />

            <input
              value={editingGame.title}
              onChange={(e) =>
                setEditingGame({
                  ...editingGame,
                  title: e.target.value,
                })
              }
              placeholder="Nome"
              className="p-3 rounded bg-[#16202d] text-white"
            />

            <input
              value={editingGame.image}
              onChange={(e) =>
                setEditingGame({
                  ...editingGame,
                  image: e.target.value,
                })
              }
              placeholder="URL da imagem"
              className="p-3 rounded bg-[#16202d] text-white"
            />

            <input
              value={editingGame.category}
              onChange={(e) =>
                setEditingGame({
                  ...editingGame,
                  category: e.target.value,
                })
              }
              placeholder="Categoria"
              className="p-3 rounded bg-[#16202d] text-white"
            />

            <input
              value={editingGame.price}
              onChange={(e) =>
                setEditingGame({
                  ...editingGame,
                  price: e.target.value,
                })
              }
              placeholder="Preço"
              className="p-3 rounded bg-[#16202d] text-white"
            />

            <input
              type="number"
              value={editingGame.discount}
              onChange={(e) =>
                setEditingGame({
                  ...editingGame,
                  discount: Number(e.target.value),
                })
              }
              placeholder="Desconto"
              className="p-3 rounded bg-[#16202d] text-white"
            />

            <input
              type="number"
              value={editingGame.rating}
              onChange={(e) =>
                setEditingGame({
                  ...editingGame,
                  rating: Number(e.target.value),
                })
              }
              placeholder="Avaliação"
              className="p-3 rounded bg-[#16202d] text-white"
            />

            <div className="flex gap-3 mt-3">

             
<button
  onClick={() => {
    const updatedGames = games.map((g: any) =>
      g.id === editingGame.id ? editingGame : g
    );

    console.log(updatedGames);

    setGames(updatedGames);
    setEditingGame(null);
  }}
  className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-5 py-3 rounded transition"
>
  Salvar Alterações
</button>
              <button
                onClick={() => setEditingGame(null)}
                className="bg-gray-600 hover:bg-gray-500 text-white font-bold px-5 py-3 rounded transition"
              >
                Cancelar
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}