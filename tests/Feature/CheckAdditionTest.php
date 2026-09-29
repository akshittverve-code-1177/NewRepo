<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Services\Calculator;

class CheckAdditionTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_example(): void
    {
        $cal = new Calculator();
        $result = $cal->AddFun(2,5);
        $this->assertEquals(7,$result);
    }
}
