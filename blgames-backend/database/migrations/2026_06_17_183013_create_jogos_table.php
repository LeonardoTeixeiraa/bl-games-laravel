<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('jogos', function (Blueprint $table) {
            $table->id();

            $table->foreignId('categoria_id')
            ->constrained('categorias')
            ->onDelete('cascade');

            $table->string('nome');
            $table->string('plataforma');
            $table->string('genero');
            $table->string('desenvolvedora');
            $table->string('classificacao');
            $table->text('descricao')->nullable();
            $table->string('imagem_url')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jogos');
    }
};
