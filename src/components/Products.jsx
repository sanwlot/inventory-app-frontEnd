import ProductsTable from "./ProductsTable"
import AddNewProductForm from "./AddNewProductForm"

export default function Products({ selectedCategory }) {
  return (
    <div className="products-container">
      <h2>{selectedCategory}</h2>
      {selectedCategory && (
        <AddNewProductForm selectedCategory={selectedCategory} />
      )}
      <ProductsTable selectedCategory={selectedCategory} />
    </div>
  )
}
