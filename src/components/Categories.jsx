import { useState } from "react"
import { useInventories, useInventoriesDispatch } from "../InventoryContext"
import axios from "axios"

export default function Categories({ selectedCategory, setSelectedCategory }) {
  const { categories } = useInventories()
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
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="">--select category--</option>
        {categories &&
          categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
      </select>
      <hr className="border border-secondary border-3 opacity-75" />
    </div>
  )
}
