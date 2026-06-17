<?php
use App\Models\Jogo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

//Listar todos os jogos
Route::get('/jogos', function(Request $request){
    return Jogo::all();
});
