<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Avaliacao extends Model
{
    protected $table = 'avaliacao';

    protected $fillable = [
        'jogo_id',
        'nota',
        'comentario',
        'user_id',
    ];

    public function jogo()
    {
        return $this->belongsTo(Jogo::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
