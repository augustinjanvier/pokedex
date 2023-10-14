import { Component } from '@angular/core';
import { PokemonSpecie } from 'src/models/PokemonSpecie';
import { Pokemon } from 'src/models/Pokemon';
import { PokemonService } from 'src/services/pokemon.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css']
})
export class PokemonCardComponent {

  loading: boolean = true;
  id: number = 25;

  current_pokemon_specie: PokemonSpecie | null = null;
  current_pokemon: Pokemon | null = null;

  constructor(
    public pokemonSerice: PokemonService
  ) {}

  ngOnInit() {
    forkJoin({
      pokemon: this.pokemonSerice.getPokemonById(this.id),
      pokemonSpecie: this.pokemonSerice.getPokemonSpecieById(this.id)
    }).subscribe({
      next: ({pokemon, pokemonSpecie}) => {
        this.current_pokemon = pokemon;
        this.current_pokemon_specie = pokemonSpecie;
      },
      error: (error) => {
        console.log(error);
      }
    }).add(() => {
     this.loading = false; 
    });
  }
}
