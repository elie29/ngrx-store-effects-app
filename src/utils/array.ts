export function flattenArray(items: Array<any>, entities: {}) {
  return items.reduce(
    (entities, item) => {
      // we add to entities the current item
      return { ...entities, [item.id]: item };
    },
    { ...entities } // initial state
  );
}
