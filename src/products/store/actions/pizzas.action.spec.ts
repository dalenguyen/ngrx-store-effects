import * as fromPizzas from './pizzas.action'

describe('Pizza Actions', () => {
  describe('LoadPizzas Actions', () => {
    describe('LoadPizzas', () => {
      it('should create an action', () => {
        const action = new fromPizzas.LoadPizzas()

        // spread (...) is neccessary to create a type of Object from LoadPizzas type
        // otherwise the test will fail
        expect({ ...action }).toEqual({
          type: fromPizzas.LOAD_PIZZAS
        })
      })
    })

    describe('LoadPizzasFail', () => {
      it('should create an action', () => {
        const payload = { message: 'Load Error' }
        const action = new fromPizzas.LoadPizzasFail(payload)

        expect({ ...action }).toEqual({
          type: fromPizzas.LOAD_PIZZAS_FAIL,
          payload
        })
      })
    })

    describe('LoadPizzasSuccess', () => {
      it('should create an action', () => {
        const payload = [
          {
            name: "Seaside Surfin'",
            toppings: [
              {
                id: 6,
                name: 'mushroom'
              },
              {
                id: 7,
                name: 'olive'
              },
              {
                id: 3,
                name: 'basil'
              },
              {
                id: 9,
                name: 'pepper'
              },
              {
                id: 5,
                name: 'mozzarella'
              },
              {
                id: 1,
                name: 'anchovy'
              }
            ],
            id: 2
          },
          {
            name: "Plain Ol' Pepperoni",
            toppings: [
              {
                id: 10,
                name: 'pepperoni'
              },
              {
                id: 6,
                name: 'mushroom'
              },
              {
                id: 1,
                name: 'anchovy'
              },
              {
                id: 4,
                name: 'chili'
              },
              {
                id: 3,
                name: 'basil'
              }
            ],
            id: 3
          }
        ]
        const action = new fromPizzas.LoadPizzasSuccess(payload)

        expect({ ...action }).toEqual({
          type: fromPizzas.LOAD_PIZZAS_SUCCESS,
          payload
        })
      })
    })
  })
})
