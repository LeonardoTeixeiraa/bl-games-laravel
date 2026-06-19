<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Avaliacao;

class AvaliacaoController
{
    // Atualiza somente o autor da avaliação
    public function update(Request $request, $id)
    {
        $avaliacao = Avaliacao::find($id);

        if (!$avaliacao) {
            return response()->json(['mensagem' => 'Avaliação não encontrada.'], 404);
        }

        $user = $request->user();
        if (!$user || $avaliacao->user_id !== $user->id) {
            return response()->json(['mensagem' => 'Não autorizado.'], 403);
        }

        $dados = $request->validate([
            'comentario' => 'nullable|string',
            'nota' => 'nullable|integer|min:0|max:100',
        ]);

        $avaliacao->update($dados);

        return response()->json([
            'mensagem' => 'Avaliação atualizada com sucesso',
            'avaliacao' => $avaliacao->refresh()
        ]);
    }

    // Deleta somente o autor da avaliação
    public function destroy(Request $request, $id)
    {
        $avaliacao = Avaliacao::find($id);

        if (!$avaliacao) {
            return response()->json(['mensagem' => 'Avaliação não encontrada.'], 404);
        }

        $user = $request->user();
        if (!$user || $avaliacao->user_id !== $user->id) {
            return response()->json(['mensagem' => 'Não autorizado.'], 403);
        }

        $avaliacao->delete();

        return response()->json(['mensagem' => 'Avaliação excluída com sucesso.']);
    }
}
