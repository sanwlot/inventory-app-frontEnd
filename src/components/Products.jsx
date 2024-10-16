import ProductsTable from "./ProductsTable"
import AddNewProductForm from "./AddNewProductForm"
import { useInventories } from "../InventoryContext"

export default function Products() {
  const { categories, selectedCategoryId } = useInventories()
  const selectedCategoryObj = categories.find(
    (cat) => cat.id == selectedCategoryId
  )
  return (
    <div className="products-container">
      {selectedCategoryId && (
        <>
          <h2>Category: {selectedCategoryObj?.name}</h2>
          <AddNewProductForm />
        </>
      )}
      <ProductsTable />
    </div>
  )
}
