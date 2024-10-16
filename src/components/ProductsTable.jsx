import { useState } from "react"
import { useInventories, useInventoriesDispatch } from "../InventoryContext"
import axios from "axios"

export default function ProductsTable() {
  const { products, selectedCategoryId } = useInventories()
  const dispatch = useInventoriesDispatch()

  const [editProductForm, setEditProductForm] = useState({
    name: "",
    quantity: 0,
    price: 0,
  })
  const [editingProductID, setEditingProductID] = useState(null)
  function handleEditProductFormChange(e) {
    const { name, value } = e.target
    setEditProductForm({
      ...editProductForm,
      category_id: selectedCategoryId,
      [name]: value,
    })
  }
  function handleEditProduct(editedProduct, id) {
    axios
      .put(`http://localhost:5252/products/${id}`, { id, ...editedProduct })
      .then((response) => {
        dispatch({ type: "EDIT_PRODUCT", payload: response.data })
      })
      .catch((error) => {
        console.log(error)
      })
  }
  function handleDeleteProduct(id) {
    axios
      .delete(`http://localhost:5252/products/${id}`)
      .then((response) => {
        if (response.data) {
          dispatch({ type: "DELETE_PRODUCT", payload: response.data })
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <table className="table table-hover">
      <thead className="table-dark">
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Name</th>
          <th scope="col">Quantity</th>
          <th scope="col">Price</th>
          <th scope="col">Update</th>
          <th scope="col">Remove</th>
        </tr>
      </thead>
      <tbody>
        {products &&
          products
            .filter((product) => product.category_id == selectedCategoryId)
            .map((product) => {
              const isEditing = editingProductID == product.id
              return (
                <tr key={`${product.id}-${product.name}`}>
                  {isEditing ? (
                    <>
                      <td>{product.id}</td>
                      <td>
                        <input
                          className="form-control"
                          name="name"
                          type="text"
                          placeholder={product.name}
                          onChange={(e) => handleEditProductFormChange(e)}
                        />
                      </td>
                      <td>
                        <input
                          className="form-control"
                          name="quantity"
                          type="number"
                          placeholder={product.quantity}
                          onChange={(e) => handleEditProductFormChange(e)}
                        />
                      </td>
                      <td>
                        <input
                          className="form-control"
                          name="price"
                          type="number"
                          placeholder={product.price}
                          onChange={(e) => handleEditProductFormChange(e)}
                        />
                      </td>

                      <td style={{ display: "flex" }}>
                        <button
                          disabled={
                            !editProductForm.name ||
                            !editProductForm.quantity ||
                            !editProductForm.price
                          }
                          className="btn btn-secondary"
                          onClick={() => {
                            setEditingProductID(null)
                            handleEditProduct(editProductForm, product.id)
                          }}
                        >
                          Save
                        </button>
                        <button
                          className="btn btn-secondary"
                          onClick={() => setEditingProductID(null)}
                        >
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <th scope="row">{product.id}</th>
                      <td>{product.name}</td>
                      <td>{product.quantity}</td>
                      <td>{product.price}</td>
                      <td>
                        <button
                          className="btn btn-secondary"
                          onClick={() => setEditingProductID(product.id)}
                        >
                          Edit
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-secondary"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              )
            })}
      </tbody>
    </table>
  )
}
