import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpResponse, HttpRequest } from '@angular/common/http';
import { PokemonSpecie } from 'src/models/PokemonSpecie';
import { Pokemon } from 'src/models/Pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  apiUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient,
  ) { }

  /* =====================================
  ===== HTTP Requests ====================
  ===================================== */ 
  getPokemonById(id: number): Observable<any> {
    return this.http.request("GET", this.apiUrl + 'pokemon/' + id)
  }

  getPokemonSpecieById(id: number): Observable<any> {
    return this.http.request("GET", this.apiUrl + 'pokemon-species/' + id)
  }
  
  /* =====================================
  ===== Pokemon Functions ================
  ===================================== */ 
  getPokemonFrenchName(pokemonSpecie: PokemonSpecie | null): string | undefined {
    return pokemonSpecie?.names.find(n => n.language.name == 'fr')?.name ?? "Unknown";
  }

  getPokemonSpriteUrl(pokemon: Pokemon | null): string | undefined {
    return pokemon?.sprites.front_default;
  }
}
