export const exampleLoader = () => async () => {
  await fetch('https://pokeapi.co/api/v2/pokemon/ditto').then((response) => {
    console.log(response);
  });

  return null;
};
