<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApiController;
use App\Http\Controllers\DashboardController;

Route::get('/', [DashboardController::class, "login"]);
Route::post('/login', [DashboardController::class, "authenticate"]);

Route::middleware([
    "auth"
])->group(function(){
    Route::get('/dashboard', [DashboardController::class, "index"])->name("dashboard");

    Route::get('/api/fetch-blogs', [ApiController::class, "fetch_blogs"]);
    Route::get('/api/fetch-blog/{id}', [ApiController::class, "fetch_blog"]);
    Route::post('/api/create-blog', [ApiController::class, "create_blog"])->name("create-blog");
    Route::post('/api/delete-blog', [ApiController::class, "delete_blog"])->name("delete-blog");
    Route::post('/api/update-blog/{id}', [ApiController::class, "update_blog"])->name("update-blog");

});