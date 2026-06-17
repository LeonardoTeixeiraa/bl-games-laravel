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
        //validar os dados da requisição
        $request->validate([
            'nome' => 'required|string|max:255',
            'plataforma' => 'required|string|max:255',
            'genero' => 'required|string|max:255',
            'desenvolvedora' => 'required|string|max:255',
            'classificacao' => 'required|integer',
            'descricao' => 'required|string',
            'categoria_id' => 'required|integer',
            'imagem_url' => 'required|image|mimes:jpeg,png,jpg|max:2048'

        ]);

        $caminhoImagem = $request->file('imagem_url')->store('banners', 'public');

        //cadasttar jogo
        $jogo = Jogo::create([
            'nome' => $request->input('nome'),
            'plataforma' => $request->input('plataforma'),
            'genero' => $request->input('genero'),
            'desenvolvedora' => $request->input('desenvolvedora'),
            'classificacao' => $request->input('classificacao'),
            'descricao' => $request->input('descricao'),
            'categoria_id' => $request->input('categoria_id'),
            'imagem_url' => $caminhoImagem,
        ]);

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
