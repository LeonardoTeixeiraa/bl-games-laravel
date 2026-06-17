<?php

use App\Http\Controllers\JogoController;
use App\Models\Jogo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

//Listar todos os jogos
Route::get('/jogos', function (Request $request) {
    $jogos = Jogo::select('id', 'nome', 'plataforma', 'genero', 'desenvolvedora', 'classificacao', 'descricao', 'categoria_id', 'imagem_url')->get();

    return $jogos->map(function ($jogo) {
        $jogo->imagem_url = asset('storage/' . $jogo->imagem_url);
        return $jogo;
    });
});
Route::get('/jogos', [JogoController::class, 'store']); // Cadastrar um jogo
