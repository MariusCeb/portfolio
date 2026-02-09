<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'isAdmin',
        'cv',
        'expiration_date',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'isAdmin' => 'boolean',
        'expiration_date' => 'datetime',
    ];

    // Le classi a cui l'utente è iscritto (molti a molti)
    public function classrooms()
    {
        return $this->belongsToMany(Classroom::class)->withTimestamps();
    }

    public function createdClasses()
    {
        return $this->hasMany(Classroom::class, 'created_by');
    }

    public function isExpired(): bool
    {
        return $this->expiration_date && now()->greaterThan($this->expiration_date);
    }
}
