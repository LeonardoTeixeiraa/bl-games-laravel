<?php

namespace App\Http\Controllers;

use App\Models\Jogo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class JogoController
{
    // public function buscar(Request $request){
    //     $termo = $request->input('termo');

    //     if(!$termo){
    //         return response()->json([]);
    //     }

    //     $jogos = 
    // }

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
        $jogo = Jogo::find($id);

        if (!$jogo) {
            return response()->json(['mensagem' => 'Jogo não encontrado.'], 404);
        }

        $dadosParaAtualizar = $request->except('banner');

        if ($request->hasFile('banner')) {
            // Apagar a imagem antiga
            if ($jogo->imagem_url) {
                Storage::disk('public')->delete($jogo->imagem_url);
            }
            // salvar imagemn nova
            $dadosParaAtualizar['imagem_url'] = $request->file('banner')->store('banners', 'public');
        }

        $jogo->update($dadosParaAtualizar);

        return response()->json([
            'mensagem' => 'Jogo atualizado com sucesso!',
            'jogo' => $jogo
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
