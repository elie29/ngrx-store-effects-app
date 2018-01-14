import { flattenArray } from '../../src/utils/array';

describe('Flatten Array Spec', () => {
  it('should flatten an empty array', () => {
    const flatten = flattenArray([], {});
    expect(flatten).toEqual({});
  });

  it('should flatten an array of object with an empty entities', () => {
    const flatten = flattenArray(
      [
        { id: 1, name: 'elie' },
        { id: 12, name: 'jean' },
        { id: 15, name: 'John' }
      ],
      {}
    );
    expect(flatten).toEqual({
      1: { id: 1, name: 'elie' },
      12: { id: 12, name: 'jean' },
      15: { id: 15, name: 'John' }
    });
  });

  it('should flatten an array of same objects with an empty entities', () => {
    const flatten = flattenArray(
      [
        { id: 1, name: 'elie' },
        { id: 1, name: 'jean' },
        { id: 1, name: 'John' }
      ],
      {}
    );
    expect(flatten).toEqual({
      1: { id: 1, name: 'John' }
    });
  });

  it('should flatten an array of objects with an existing entities', () => {
    const flatten = flattenArray(
      [
        { id: 10, name: 'elie' },
        { id: 12, name: 'jean' },
        { id: 14, name: 'John' }
      ],
      {
        1: { id: 1, name: 'John' }
      }
    );
    expect(flatten).toEqual({
      1: { id: 1, name: 'John' },
      10: { id: 10, name: 'elie' },
      12: { id: 12, name: 'jean' },
      14: { id: 14, name: 'John' }
    });
  });
});
