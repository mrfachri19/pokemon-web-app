import { BaseService } from "./base-service";
import { CORE_API_URL } from "../utils/env";
import type { BaseResponseContract } from "./base-response-contract";

const BASE_URL = `${CORE_API_URL}/pokemon`;

interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonDetail {
  name: string;
  sprites: {
    front_default: string | null;
    front_shiny: string | null;
  };
  abilities: { ability: { name: string } }[];
  height: number;
  species: { name: string };
  stats: { base_stat: number; stat: { name: string } }[];
}

export class PokemonService extends BaseService {
  async fetch(queryParam: Record<string, string>) {
    const response = await this._get<BaseResponseContract<PokemonListItem[]>>(
      `${BASE_URL}`,
      queryParam
    );
    return response;
  }

  async getById(uuid: string) {
    const response = await this._get<PokemonDetail>(
      `${BASE_URL}/${uuid}`
    );

    return response;
  }
}
