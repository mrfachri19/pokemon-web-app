import type { PokemonService } from "../services/pokemon-service";

export class FetchPokemonUsecase {
  private service: PokemonService;

  constructor(service: PokemonService) {
    this.service = service;
  }

  async execute(queryParam: Record<string, string>) {
    const result = await this.service.fetch(queryParam);

    return {
      ...result,
    };
  }
}

export class GetByIdPokemonUsecase {
  private service: PokemonService;

  constructor(service: PokemonService) {
    this.service = service;
  }

  async execute(uuid: string) {
    return await this.service.getById(uuid);
  }
}
