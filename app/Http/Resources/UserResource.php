<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public static $wrap = false;
    
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'image' => $this->image,
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
            'email' => $this->email,
        ];
    }
}
