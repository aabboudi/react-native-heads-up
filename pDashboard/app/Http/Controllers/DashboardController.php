<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
class DashboardController extends Controller
{
    public function login()
    {
        return view("login");
    }

    public function authenticate(Request $request)
    {
        $creds = $request->validate([
            'email' => ['required', 'email'],
            "passowrd" => ["required"]
        ]);
        if(Auth::attempt($creds)){
            $request->session()->regenerate();
            return redirect()->intended("dashboard");
        }

        return back()->withErrors([
            "email" => "Incorrect credentials."
        ]);
    }

    public function dashboard()
    {
        return view("dashboard");
    }
}
