export const keyExtractor = <T extends { id: string | number } & {}>(
  item: T,
) => {
  return typeof item.id === 'number' ? item.id.toString() : item.id;
};

export const keyIndexExtractor = <T extends unknown>(_: T, index: number) => {
  return index.toString();
};
