<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Event>
 */
class EventFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->text(20),
            'description' => fake()->text(2000),
            'date' => now()->format('Y-m-d H:i:s'),
            'image' => fake()->imageUrl(),
            'donationTotal' => fake()->numberBetween(10000, 100000),
            'donationGoal' => fake()->numberBetween(100000, 1000000),
            'location' => fake()->address(),
            'category' => fake()->randomElement(['community', 'charity', 'environment']),
        ];
    }
}
