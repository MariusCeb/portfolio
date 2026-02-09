<?php

use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ClassroomController;
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Log;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::middleware(['auth', 'check.subscription'])->group(function () {
    Route::get('/dashboard', fn () => Inertia::render('dashboard'))->name('dashboard');
});



Route::get('/cv-validation', function () {
    return Inertia::render('auth/cvValidation');
})->name('cv.validation');

Route::post('/classrooms', [ClassroomController::class, 'store'])->name('classrooms.store');
Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(['auth'])->name('dashboard');
// Route::get('/posts/create', [PostController::class, 'create'])->name('posts.create');
// Route::post('/posts', [PostController::class, 'store'])->name('posts.store');
Route::get('/classrooms/{classroom}', [ClassroomController::class, 'show'])->name('classrooms.show');
Route::prefix('classrooms/{classroom}')->group(function() {
    Route::get('posts/create', [PostController::class, 'create'])->name('classrooms.posts.create');
    Route::post('posts', [PostController::class, 'store'])->name('classrooms.posts.store');
});
Route::delete('/posts/{post}', [PostController::class, 'destroy'])->name('posts.destroy');
Route::put('/posts/{post}', [PostController::class, 'update'])->name('posts.update');
Route::post('/classrooms/join', [ClassroomController::class, 'join'])->name('classrooms.join');
Route::delete('/classrooms/{classroom}', [ClassroomController::class, 'destroy'])->middleware('auth');
Route::put('/classrooms/{classroom}', [ClassroomController::class, 'update'])->name('classrooms.update');
Route::get('/payment', fn () => Inertia::render('auth/paymentFake'))->name('payment.page');

Route::post('/payment/renew', function () {
    auth()->user()->update([
        'expiration_date' => now()->addMonth(),
    ]);
    return redirect()->route('dashboard');
})->name('payment.renew');





require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
