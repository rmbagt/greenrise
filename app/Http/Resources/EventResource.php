<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EventResource extends JsonResource
{
    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // dd($this->donations);
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'date' => $this->date,
            'image' => $this->image,
            'donationTotal' => $this->donationTotal,
            'donationGoal' => $this->donationGoal,
            'location' => $this->location,
            'category' => $this->category,
            'donations' => $this->donations->map(function ($donation) {
                return [
                    'id' => $donation->id,
                    'event' => $donation->event,
                    'user' => $donation->user,
                    'amount' => $donation->amount,
                    'date' => $donation->date,
                    'created_at' => $donation->created_at,
                ];
            }),
            'created_at' => $this->created_at,
        ];
    }
}
