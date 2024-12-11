<?php

namespace App\Http\Controllers;

use App\Http\Resources\DonationResource;
use App\Http\Resources\EventResource;
use App\Models\Donation;
use App\Models\Event;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $events = Event::with('donations')->get();
        // $event = User::with('donations')->get();
        // $donations = $event->donation;

        return Inertia::render('Event/Index', [
            'events' => EventResource::collection($events),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Event/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'date' => ['required', 'date'],
            'image' => ['required', 'image', 'max:2048'], // 2MB Max
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('event', 'public');
            $data['image'] = Storage::url($path);
        }

        $data['donationTotal'] = 0;
        $event = Event::create($data);

        return to_route('event.index')->with('success', 'Event created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $event = Event::with('donations')->findOrFail($id);
        $donators = Donation::with('user')
            ->where('event_id', $id)
            ->orderBy('amount', 'desc')
            ->get();

        return Inertia::render('Event/Show', [
            'event' => new EventResource($event),
            'donators' => DonationResource::collection($donators),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Event $event)
    {
        return Inertia::render('Event/Edit', [
            'event' => new EventResource($event),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Event $event)
    {
        $data = $request->validate([
            'title' => ['required', 'string'],
            'description' => ['required', 'string'],
            'date' => ['required', 'date'],
            'image' => ['required', 'string'],
        ]);
        $event->update($data);

        return to_route('event.index')->with('success', 'Event updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Event $event)
    {
        $event->delete();

        return to_route('event.index')->with('success', 'Event deleted successfully.');
    }
}
