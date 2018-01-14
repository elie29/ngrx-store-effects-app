/**
 * Flaten an array of items into an object.
 *
 * @param items Array of items with id.
 * @param entities Current object to add items to it.
 */
export function flattenArray(items: Array<any>, entities: {}) {
  return items.reduce(
    (entities, item) => {
      // we add to entities the current item
      return { ...entities, [item.id]: item };
    },
    { ...entities } // initial state by shallow copy
  );
}
