import { useState } from "react"
import { useInventories, useInventoriesDispatch } from "../InventoryContext"
import axios from "axios"

export default function Categories() {
  const { categories, selectedCategoryId } = useInventories()
  const dispatch = useInventoriesDispatch()
  const [newCategory, setNewCategory] = useState("")
  function addCategory(newCategory) {
    axios
      .post("http://localhost:5252/categories", {
        name: newCategory,
      })
      .then((response) => {
        dispatch({ type: "ADD_CATEGORY", payload: response.data })
      })
      .catch((error) => {
        console.log(error)
      })
  }
  function deleteCategory(selectedCategoryId) {
    console.log(selectedCategoryId)
    axios
      .delete(`http://localhost:5252/categories/${selectedCategoryId}`)
      .then((response) => {
        if (response.data) {
          dispatch({ type: "DELETE_CATEGORY", payload: response.data.id })
          dispatch({ type: "SET_SELECTED_ID", payload: "" })
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div className="categories-container">
      <div>
        <input
          className="form-control"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          type="text"
          placeholder="new category"
          required
        />
        <button
          style={{ marginBottom: "20px" }}
          className="btn btn-secondary"
          onClick={() => addCategory(newCategory)}
          disabled={!newCategory}
        >
          Add
        </button>
      </div>
      <select
        className="form-select"
        name="category"
        value={selectedCategoryId}
        onChange={(e) =>
          dispatch({ type: "SET_SELECTED_ID", payload: e.target.value })
        }
      >
        <option value="">--select category--</option>
        {categories &&
          categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
      </select>
      <button
        onClick={() => deleteCategory(selectedCategoryId)}
        className="btn btn-secondary"
      >
        Delete Category
      </button>
      <hr className="border border-secondary border-3 opacity-75" />
    </div>
  )
}
