<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CheckSubscription
{
    public function handle(Request $request, Closure $next)
    {
        $user = Auth::user();

        // Se utente non loggato passa oltre (lascia gestire auth)
        if (!$user) {
            return $next($request);
        }

        // Controlla se la data di scadenza è passata
        if ($user->expiration_date && $user->expiration_date->isPast()) {
            
            // Permetti sempre l’accesso a pagine pubbliche o di auth
            $allowedRoutes = [
                'login',
                'register',
                'password.request',
                'password.reset',
                'welcome',
                'logout',
                'cv.validation',
                'payment.page',
                'payment.renew',
                // aggiungi qui tutte le rotte pubbliche o auth che vuoi escludere dal blocco
            ];

            if (!in_array($request->route()->getName(), $allowedRoutes)) {
                // Se la route non è in allowedRoutes, blocca e redirigi a pagamento
                return redirect()->route('payment.page');
            }
        }

        return $next($request);
    }
}
