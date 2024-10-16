import { useState } from "react"
import Categories from "./components/Categories"
import Header from "./components/Header"
import Products from "./components/Products"
import InventoryProvider from "./InventoryContext"

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("")
  return (
    <InventoryProvider>
      <Header />
      <Categories
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <Products selectedCategory={selectedCategory} />
    </InventoryProvider>
  )
}
