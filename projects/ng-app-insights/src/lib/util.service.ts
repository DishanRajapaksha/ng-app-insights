export function convertMapToDictionary(map?: Map<string, string | number>): { [p: string]: any } {
  const values: { [key: string]: any } = {};

  map?.forEach((value, key) => {
    if (key && value !== null && value !== undefined) {
      values[key] = value;
    }
  });

  return values;
}
