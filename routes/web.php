<?php

use App\Http\Controllers\ResponseController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('RSVP');
});

Route::post('/rsvp', [ResponseController::class, 'create']);