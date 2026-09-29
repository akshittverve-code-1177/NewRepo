<?php

namespace App\Http\Controllers;

use App\Ai\Agents\QuickChatAgent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ChatController extends Controller
{
    public function askQuestion(Request $request) { 
        $request->validate([ 'question' => 'required|string' ]); 
        
        // Log::info('User asked question'); 
        
        try {
            $response = QuickChatAgent::make()->prompt($request->input('question'));
            return response()->json(['answer' => $response->text]); 
        } catch (Exception $e) {
            Log::error('Chat agent failed: ' . $e->getMessage());

            return response()->json([
                'answer' => 'Our AI assistant is temporarily busy. Please try asking your question again in a moment!'
            ], 200); 
        }
    }
}
