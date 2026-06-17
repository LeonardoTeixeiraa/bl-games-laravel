<?php

namespace App\Http\Controllers;

use App\Models\Jogo;
use Illuminate\Http\Request;

class JogoController
{
    // public function buscar(Request $request){
    //     $termo = $request->input('termo');

    //     if(!$termo){
    //         return response()->json([]);
    //     }

    //     $jogos = 
    // }

    public function store(Request $request){
        //validar os dados da requisição
        $request->validate([
            'nome'=>'required|string|max:255',
            'plataforma'=>'required|string|max:255',
            'genero'=>'required|string|max:255',
            'desenvolvedora'=>'required|string|max:255',
            'classificacao'=>'required|integer',
            'descricao'=>'required|string', 
            'categoria_id'=>'required|integer',
            'imagem_url'=>'required|image|mimes:jpeg,png,jpg|max:2048'

        ]);

        $caminhoImagem= $request->file('imagem_url')->store('banners', 'public');

        $jogo = Jogo::create([
            'nome'=>$request->input('nome'),
            'plataforma'=>$request->input('plataforma'),
            'genero'=>$request->input('genero'),
            'desenvolvedora'=>$request->input('desenvolvedora'),
            'classificacao'=>$request->input('classificacao'),
            'descricao'=>$request->input('descricao'),
            'categoria_id'=>$request->input('categoria_id'),
            'imagem_url'=>$caminhoImagem,
        ]);

        return response()->json([
            'mensagem'=>'Jogo cadastrado com sucesso',
            'jogo'=>$jogo
        ], 201);

    }
}
