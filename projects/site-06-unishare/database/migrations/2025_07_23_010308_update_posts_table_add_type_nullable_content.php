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
            $table->text('content')->nullable()->change();
            $table->enum('type', ['message', 'file'])->after('content');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('posts', function (Blueprint $table) {
            // Torna a rendere content non nullable
            $table->text('content')->nullable(false)->change();

            // Rimuovi la colonna type
            $table->dropColumn('type');
        });
    }
};
