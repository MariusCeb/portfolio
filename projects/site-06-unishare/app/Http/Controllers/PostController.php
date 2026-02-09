<?php

namespace App\Http\Controllers;

use App\Models\Classroom;
use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class PostController extends Controller
{
    use AuthorizesRequests;
    /**
     * Mostra il modulo per la creazione di un nuovo annuncio.
     */
    public function create(Classroom $classroom)
    {
        // Restituisce la vista per la creazione dell'annuncio con Inertia
        return Inertia::render('Posts/create', [
            'classroom' => $classroom,
        ]);
    }

    /**
     * Salva un nuovo annuncio nel database.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Http\JsonResponse
     */
    public function store(Request $request, Classroom $classroom)
    {
        // Validazione dati
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'nullable|string',
            'price' => 'nullable|numeric',
            'file' => 'nullable|file|max:10240',
        ]);

        // Crea il post associato alla classroom e all'utente
        $post = Post::create([
            'classroom_id' => $classroom->id,
            'user_id' => auth()->id(),
            'title' => $validated['title'],
            'content' => $validated['content'] ?? null,
            'price' => $validated['price'] ?? null,
            'file_path' => $request->file('file') ? $request->file('file')->store('uploads', 'public') : null,
        ]);

        if ($request->wantsJson()) {
            return response()->json($post, 201);
        }

        return redirect()->route('classrooms.show', $classroom->id)->with('success', 'Annuncio creato con successo!');
    }


    /**
     * Mostra la lista degli annunci nella classroom.
     */
    public function index(Classroom $classroom)
    {
        // Recupera i post della classroom ordinati per data di creazione (opzionale)
        $posts = $classroom->posts()->orderBy('created_at', 'desc')->get();

        // Restituisce la vista con i post e la classroom
        return Inertia::render('Posts/Index', [
            'classroom' => $classroom,
            'posts' => $posts,
        ]);
    }


    public function destroy(Post $post)
    {
        $post->delete();

        return back()->with('success', 'Post eliminato.');
    }

   public function update(Request $request, Post $post)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'content' => ['nullable', 'string'],
            'price' => ['nullable', 'numeric', 'min:0'],
            'file' => ['nullable', 'file', 'max:10240'],
        ]);

        if ($request->has('price') && $request->price === '') {
            $validated['price'] = null;
        }

        if ($request->hasFile('file')) {
            // salva il file e aggiorna file_path
            $path = $request->file('file')->store('uploads', 'public');
            $validated['file_path'] = $path;
        }

        $post->update($validated);

        // invece di back() fai un redirect a show del classroom
        return redirect()->route('classrooms.show', $post->classroom_id)
            ->with('success', 'Post aggiornato con successo.');
    }



    public function show(Classroom $classroom)
    {
        $posts = $classroom->posts()->latest()->get();

        return Inertia::render('ClassroomPage', [
            'classroom' => $classroom,
            'posts' => $posts,
        ]);
    }

}