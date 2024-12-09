<?php

namespace Database\Factories;

use App\Models\Event;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Donation>
 */
class DonationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $events = Event::all();
        $users = User::all();
        return [
            'event_id' => $events->random()->id,
            'user_id' => $users->random()->id,
            'amount' => fake()->numberBetween(10000, 100000),
            'date' => now(),
        ];
    }
}
