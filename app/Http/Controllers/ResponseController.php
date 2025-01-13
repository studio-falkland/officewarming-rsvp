<?php

namespace App\Http\Controllers;

use App\Models\Response;
use Illuminate\Http\Request;

class ResponseController extends Controller
{
    public function create(Request $request) {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'persons' => 'integer|min:1',
            'email' => 'email'
        ]);

        $response = Response::create($data);

        $request->session()->put('response_id', $response->id);

        return "OK";
    }
}
