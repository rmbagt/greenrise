<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Donation;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        $stats = [
            'totalEvents' => Event::count(),
            'ongoingEvents' => Event::where('date', '>=', now())->count(),
            'totalDonators' => User::whereHas('donations')->count(),
            'newDonatorsLastMonth' => User::whereHas('donations', function ($query) {
                $query->whereMonth('created_at', Carbon::now()->subMonth()->month);
            })->count(),
            'eventsSupported' => $user->donations()->distinct('event_id')->count(),
            'totalDonations' => $user->donations()->sum('amount'),
            'lastMonthDonations' => $user->donations()
                ->whereMonth('created_at', Carbon::now()->subMonth()->month)
                ->sum('amount'),
        ];

        $ongoingEvents = Event::where('date', '>=', now())
            ->with('donations')
            ->take(3)
            ->get()
            ->map(function ($event) {
                return [
                    'id' => $event->id,
                    'title' => $event->title,
                    'date' => $event->date,
                    'image' => $event->image,
                    'participants' => $event->donations->count(),
                ];
            });

        $topDonators = User::withSum('donations', 'amount')
            ->whereHas('donations', function ($query) {
                $query->whereMonth('created_at', Carbon::now()->month);
            })
            ->orderByDesc('donations_sum_amount')
            ->take(5)
            ->get()
            ->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'image' => $user->profile_photo_url,
                    'amount' => $user->donations_sum_amount,
                    'events' => $user->donations()->distinct('event_id')->count(),
                ];
            });

        $donationRequests = Event::where('date', '>=', now())
            ->withSum('donations', 'amount')
            ->orderBy('date')
            ->take(3)
            ->get()
            ->map(function ($event) {
                return [
                    'id' => $event->id,
                    'title' => $event->title,
                    'current' => $event->donations_sum_amount,
                    'target' => $event->target_amount,
                    'deadline' => Carbon::parse($event->date)->diffForHumans(['parts' => 1]),
                    'status' => Carbon::parse($event->date)->isPast() ? 'completed' : 'active',
                ];
            });

        return Inertia::render('Dashboard/Index', [
            'stats' => $stats,
            'ongoingEvents' => $ongoingEvents,
            'topDonators' => $topDonators,
            'donationRequests' => $donationRequests,
        ]);
    }
}

