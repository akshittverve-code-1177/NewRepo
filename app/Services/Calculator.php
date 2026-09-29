<?php

namespace App\Services;

class Calculator
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    public function AddFun(int $a, int $b):int{
        return $a + $b;
    }
}
