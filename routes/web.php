<?php

use App\Enum\RolesEnum;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DonationController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\LandingController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [LandingController::class, 'index'])->name('landing');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::middleware(['verified'])->group(function(){
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
        
        Route::resource('admin', AdminController::class)->middleware('role:' . RolesEnum::Admin->value);

        Route::resource('event', EventController::class)->except(['index', 'show'])->middleware('role:' . RolesEnum::Admin->value);

        Route::get('/events', [EventController::class, 'index'])->name('event.index');
        Route::get('/events/{id}', [EventController::class, 'show'])->name('event.show');

        Route::post('/donation', [DonationController::class, 'store'])->name('donation.store');

    });
});

require __DIR__.'/auth.php';
