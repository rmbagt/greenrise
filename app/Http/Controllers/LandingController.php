<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Facades\Route;

class LandingController extends Controller
{
    public function index()
    {
        // Get featured events (latest 3 events)
        $featuredEvents = Event::latest()
            ->take(3)
            ->get();

        // Get upcoming events (events with dates in the future)
        $upcomingEvents = Event::where('date', '>=', Carbon::now())
            ->orderBy('date', 'asc')
            ->take(6)
            ->get();

        return Inertia::render('Landing/Index', [
            'featuredEvents' => $featuredEvents,
            'upcomingEvents' => $upcomingEvents,
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
        ]);
    }
}

