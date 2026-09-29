<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ChatController;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post('/ai/ask', [ChatController::class, 'askQuestion']);
Route::post('/ai/chat', [ChatController::class, 'continueChat']);



