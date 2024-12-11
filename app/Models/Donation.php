<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Donation extends Model
{
    use HasFactory;
    protected $guarded = [];

    function user(){
        return $this->belongsTo(User::class);
    }

    function event(){
        return $this->belongsTo(Event::class);
    }

}
