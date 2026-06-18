<?php

use App\Http\Controllers\JogoController;
use App\Models\Jogo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

//Listar todos os jogos (suporta busca via ?termo=palavra)
Route::get('/jogos', function (Request $request) {
    $termo = $request->input('termo');

    $query = Jogo::select('id', 'nome', 'plataforma', 'genero', 'desenvolvedora', 'classificacao', 'descricao', 'categoria_id', 'imagem_url');

    if ($termo) {
        $query->where(function ($q) use ($termo) {
            $q->where('nome', 'like', "%{$termo}%")
                ->orWhere('genero', 'like', "%{$termo}%")
                ->orWhere('desenvolvedora', 'like', "%{$termo}%");
        });
    }

    $jogos = $query->get();

    return $jogos->map(function ($jogo) {
        $jogo->imagem_url = asset('storage/' . $jogo->imagem_url);
        return $jogo;
    });
});
Route::post('/login', [\App\Http\Controllers\AuthController::class, 'login']); // Login
Route::post('/register', [\App\Http\Controllers\AuthController::class, 'register']); // Register

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/jogos', [JogoController::class, 'store']); // Cadastrar um jogo
    Route::put('/jogos/{id}', [JogoController::class, 'update']); // Atualizar
    Route::delete('/jogos/{id}', [JogoController::class, 'destroy']); // Apagar
});
