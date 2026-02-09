<?php

namespace App\Http\Controllers;

use App\Models\Classroom;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ClassroomController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $user = auth()->user();

        do {
            $joinCode = Str::upper(Str::random(6));
        } while (Classroom::where('join_code', $joinCode)->exists());

        $classroom = Classroom::create([
            'name' => $request->name,
            'description' => $request->description,
            'join_code' => $joinCode,
            'created_by' => auth()->id(),
        ]);

        // Ora aggiungo l'associazione nella tabella pivot
        // per dire che l'utente è iscritto alla classe (e creatore)
        $classroom->users()->attach($user->id);

        return redirect()->back()->with('success', 'Classe creata con successo!');
    }

    public function show(Classroom $classroom)
    {
        $user = auth()->user();

        $classroom->is_admin = $classroom->created_by === $user->id;

        $posts = $classroom->posts()->orderBy('created_at', 'desc')->get();

        return inertia('Classrooms/show', [
            'classroom' => $classroom,
            'posts' => $posts,
        ]);
    }

    public function join(Request $request)
    {
        $request->validate([
            'join_code' => ['required', 'string'],
        ]);

        $classroom = Classroom::where('join_code', $request->join_code)->first();

        if (!$classroom) {
            return back()->withErrors(['join_code' => 'Classroom non trovata.']);
        }

        // Controlla se l'utente è già iscritto
        if ($classroom->users()->where('user_id', auth()->id())->exists()) {
            return back()->withErrors(['join_code' => 'Sei già iscritto a questa classroom.']);
        }

        // Iscrizione
        $classroom->users()->attach(auth()->id());

        return redirect()->route('classrooms.show', $classroom->id)->with('success', 'Iscritto con successo alla classroom.');
    }

    public function destroy(Classroom $classroom) 
    {
        $classroom->delete();

        return redirect()->route('dashboard')->with('success', 'Classroom eliminata con successo.');
    }

    public function update(Request $request, Classroom $classroom)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
        ]);

        $classroom->update($data);

        return redirect()->back(); // o altra risposta Inertia
    }
}
