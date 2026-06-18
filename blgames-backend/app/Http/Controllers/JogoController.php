<?php

namespace App\Http\Controllers;

use App\Models\Jogo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class JogoController
{
    public function buscar()
    {
        $search = request('search');

        if ($search) {
            $jogos = Jogo::where([
                ['nome', 'like', '%' . $search . '%']
            ])->get();
        } else {
            $jogos = Jogo::select('id', 'nome', 'plataforma', 'genero', 'desenvolvedora', 'classificacao', 'descricao', 'categoria_id', 'imagem_url')->get();

            return $jogos->map(
                function ($jogo) {
                    $jogo->imagem_url = asset('storage/' . $jogo->imagem_url);
                    return $jogo;
                }
            );
        }
        return response()->json($jogos);
    }

    public function store(Request $request)
    {
        //instanciar novo jogo
        $jogo = new Jogo();

        $jogo->nome = $request->input('nome');
        $jogo->plataforma = $request->input('plataforma');
        $jogo->genero = $request->input('genero');
        $jogo->desenvolvedora = $request->input('desenvolvedora');
        $jogo->classificacao = $request->input('classificacao');
        $jogo->descricao = $request->input('descricao');
        $jogo->categoria_id = $request->input('categoria_id');
        $jogo->imagem_url = $request->file('imagem_url')->store('banners', 'public');

        $jogo->save();
        return response()->json([
            'mensagem' => 'Jogo cadastrado com sucesso',
            'jogo' => $jogo
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $jogo = Jogo::findOrFail($id);

        $dadosParaAtualizar = $request->all();

        if ($request->hasFile('imagem_url')) {
            // Apagar a imagem antiga
            if ($jogo->imagem_url) {
                Storage::disk('public')->delete($jogo->imagem_url);
            }
            // salvar imagem nova
            $dadosParaAtualizar['imagem_url'] = $request->file('imagem_url')->store('banners', 'public');
        }

        $jogo->update($dadosParaAtualizar);

        return response()->json([
            'mensagem' => 'Jogo atualizado com sucesso!',
            'jogo' => $jogo->refresh()
        ]);
    }

    //Apagar um jogo
    public function destroy($id)
    {
        $jogo = Jogo::find($id);

        if (!$jogo) {
            return response()->json(['mensagem' => 'Jogo não encontrado.'], 404);
        }

        // Apagar a imagem do jogo
        if ($jogo->imagem_url) {
            Storage::disk('public')->delete($jogo->imagem_url);
        }

        $jogo->delete();

        return response()->json(['mensagem' => 'Jogo excluído com sucesso!']);
    }
}
