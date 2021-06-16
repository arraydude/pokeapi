export type PokemonResult = {
  name: string;
  url: string;
};

export interface IAPIPokemonList {
  count: number;
  next: string;
  previous: string;
  results: PokemonResult[];
}

export interface IAPIPokemon {
  name: string;
  sprites: {
    other: {
      dream_world: {
        front_default: string;
      };
    };
  };
  stats: {
    base_stat: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    }[];
  };
  weight: number;
}
