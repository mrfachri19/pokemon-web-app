import { useQuery } from "react-query";
import { FetchPokemonUsecase } from "../usecase/pokemon-usecase";
import { PokemonService } from "../services/pokemon-service";

const pokemonUsecase = new FetchPokemonUsecase(new PokemonService());

export const useFetchPokemon = (filters: object, enable: boolean) => {
  return useQuery({
    queryKey: ["pokemon", filters],
    queryFn: async () => pokemonUsecase.execute({ ...filters }),
    enabled: enable,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    retry: false,
    keepPreviousData: true,
  });
};
