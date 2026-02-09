<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $userId = $user->id;

        // Recupera le classi a cui l'utente è iscritto e aggiungi is_admin
        $classrooms = $user->classrooms()
            ->select('classrooms.*')
            ->get()
            ->map(function ($classroom) use ($userId) {
                $classroom->is_admin = $classroom->created_by === $userId;
                return $classroom;
            });

        return Inertia::render('dashboard', [
            'classrooms' => $classrooms,
        ]);
    }

}
