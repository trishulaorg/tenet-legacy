import { getByPath } from './getByPath'

describe('getByPath', () => {
  test('Obtains the value of the path of the second argument in the object of the first argument.', () => {
    type Target = {
      a: {
        b: {
          c: number
        }
      }
    }
    const target: Target = {
      a: {
        b: {
          c: 1,
        },
      },
    }
    const result = getByPath<Target, ['a', 'b', 'c']>(target, ['a', 'b', 'c'])
    expect(result).toBe(1)
  })
})
