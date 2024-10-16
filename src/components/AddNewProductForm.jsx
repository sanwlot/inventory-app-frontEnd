import { useState } from "react"
import { useInventoriesDispatch } from "../InventoryContext"
import axios from "axios"

export default function AddNewProductForm({ selectedCategory }) {
  const dispatch = useInventoriesDispatch()
  const [newProductForm, setNewProductForm] = useState({
    name: "",
    quantity: 0,
    price: 0,
  })
  function handleNewProductFormChange(e) {
    const { name, value } = e.target
    setNewProductForm({
      ...newProductForm,
      category: selectedCategory,
      [name]: value,
    })
  }

  function handleAddProduct(newProduct) {
    axios
      .post("http://localhost:5252/products", newProduct)
      .then((response) => {
        if (response.data) {
          dispatch({ type: "ADD_PRODUCT", payload: response.data })
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }
  return (
    <form className="add-new-product-form">
      <input
        className="form-control"
        value={newProductForm.name}
        onChange={(e) => handleNewProductFormChange(e)}
        name="name"
        type="text"
        placeholder="new product name"
        required
      />
      <input
        className="form-control"
        onChange={(e) => handleNewProductFormChange(e)}
        name="quantity"
        type="number"
        placeholder="new product quantity"
        min={1}
        required
      />
      <input
        className="form-control"
        onChange={(e) => handleNewProductFormChange(e)}
        name="price"
        type="number"
        placeholder="new product price"
        min={1}
        required
      />
      <button
        style={{ marginBottom: "20px" }}
        className="btn btn-secondary"
        type="button"
        onClick={() => handleAddProduct(newProductForm)}
        disabled={
          !newProductForm.name ||
          !newProductForm.quantity ||
          !newProductForm.price
        }
      >
        Add
      </button>
    </form>
  )
}
