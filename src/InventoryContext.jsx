import axios from "axios"
import { useEffect } from "react"
import { useReducer, useContext, createContext } from "react"

const inventoriesContext = createContext()
const inventoriesDispatchContext = createContext()

export default function InventoryProvider({ children }) {
  const [inventories, dispatch] = useReducer(inventoriesReducer, {
    categories: [],
    products: [],
    selectedCategoryId: "",
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, productsRes] = await Promise.all([
          axios.get("http://localhost:5252/categories"),
          axios.get("http://localhost:5252/products"),
        ])
        dispatch({ type: "SET_CATEGORIES", payload: categoriesRes.data })
        dispatch({ type: "SET_PRODUCTS", payload: productsRes.data })
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchData()
  }, [dispatch])
  return (
    <inventoriesContext.Provider value={inventories}>
      <inventoriesDispatchContext.Provider value={dispatch}>
        {children}
      </inventoriesDispatchContext.Provider>
    </inventoriesContext.Provider>
  )
}

export function useInventories() {
  return useContext(inventoriesContext)
}

export function useInventoriesDispatch() {
  return useContext(inventoriesDispatchContext)
}

function inventoriesReducer(inventories, action) {
  switch (action.type) {
    case "SET_SELECTED_ID": {
      return { ...inventories, selectedCategoryId: action.payload }
    }
    case "SET_CATEGORIES": {
      return {
        ...inventories,
        categories: action.payload,
      }
    }
    case "SET_PRODUCTS": {
      return {
        ...inventories,
        products: action.payload,
      }
    }
    case "ADD_CATEGORY": {
      return {
        ...inventories,
        categories: [...inventories.categories, action.payload],
      }
    }
    case "DELETE_CATEGORY": {
      return {
        ...inventories,
        categories: inventories.categories.filter((category) => {
          return category.id != action.payload
        }),
      }
    }
    case "ADD_PRODUCT": {
      return {
        ...inventories,
        products: [...inventories.products, action.payload],
      }
    }
    case "EDIT_PRODUCT": {
      return {
        ...inventories,
        products: inventories.products.map((product) =>
          product.id == action.payload.id ? action.payload : product
        ),
      }
    }
    case "DELETE_PRODUCT": {
      return {
        ...inventories,
        products: inventories.products.filter((product) => {
          return product.id != action.payload
        }),
      }
    }
  }
}
