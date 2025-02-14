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
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string("title");
            $table->longText("description");
            $table->date("date");
            $table->integer("donationTotal");
            $table->integer("donationGoal");
            $table->string("location");
            $table->enum("category", ["community", "charity", "environment"]);
            $table->string("image")->nullable();
            // $table->foreignIdFor(\App\Models\User::class);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
