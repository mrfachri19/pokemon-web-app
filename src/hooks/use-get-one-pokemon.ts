import { useQuery } from "react-query";
import { GetByIdPokemonUsecase } from "../usecase/pokemon-usecase";
import { PokemonService } from "../services/pokemon-service";

const pokemonUsecase = new GetByIdPokemonUsecase(new PokemonService());

export const useGetOnePokemon = (id?: string) => {
  return useQuery({
    queryKey: ["pokemon-detail", id],
    queryFn: () => pokemonUsecase.execute(id!),
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    retry: false,
    enabled: !!id,
  });
};
