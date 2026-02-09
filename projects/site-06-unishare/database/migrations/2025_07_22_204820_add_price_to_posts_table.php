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
        Schema::table('posts', function (Blueprint $table) {
            // Aggiungi la colonna 'price' come decimal con 8 cifre totali e 2 decimali
            $table->decimal('price', 8, 2)->nullable();  // Può essere null, puoi rimuovere nullable() se vuoi che sia obbligatorio
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('posts', function (Blueprint $table) {
            // Rimuovi la colonna 'price' se la migrazione viene annullata
            $table->dropColumn('price');
        });
    }
};