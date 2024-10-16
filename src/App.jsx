import Categories from "./components/Categories"
import Header from "./components/Header"
import Products from "./components/Products"
import InventoryProvider from "./InventoryContext"

export default function App() {
  return (
    <InventoryProvider>
      <Header />
      <Categories />
      <Products />
    </InventoryProvider>
  )
}
