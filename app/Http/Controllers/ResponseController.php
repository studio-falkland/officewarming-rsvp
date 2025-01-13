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
            'email' => 'email',
        ]);

        if ($request->input('update', false)) {
            $responseId = $request->session()->get('response_id');
            $response = Response::findOrFail($responseId);
            $response->fill($data);
            $response->save();
        } else {
            $response = Response::create($data);
            $request->session()->put('response_id', $response->id);
        }

        return "OK";
    }
}
