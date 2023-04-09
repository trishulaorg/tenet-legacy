import { setByPath } from './setByPath'

describe('setByPath', () => {
  test('Returns a new object with the value of the third argument assigned to the path specified in the second argument of the first object.', () => {
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
    const result = setByPath(target, 'a.b.c', 2)
    expect(result).toEqual({
      a: {
        b: {
          c: 2,
        },
      },
    })
  })
})
