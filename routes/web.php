<?php

use App\Http\Controllers\ResponseController;
use App\Models\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function (Request $request) {
    $responseId = $request->session()->get('response_id');
    $response = $responseId ? Response::findOrFail($responseId) : false;

    return Inertia::render('RSVP', [
        'response' => $response
    ]);
});

Route::post('/rsvp', [ResponseController::class, 'create']);