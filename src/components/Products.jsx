import ProductsTable from "./ProductsTable"
import AddNewProductForm from "./AddNewProductForm"
import { useInventories } from "../InventoryContext"

export default function Products({ selectedCategory }) {
  const { categories } = useInventories()
  const selectedCategoryObj = categories.find(
    (cat) => cat.id == selectedCategory
  )
  return (
    <div className="products-container">
      {selectedCategory && (
        <>
          <h2>Category: {selectedCategoryObj?.name}</h2>
          <AddNewProductForm selectedCategory={selectedCategory} />
        </>
      )}
      <ProductsTable selectedCategory={selectedCategory} />
    </div>
  )
}
