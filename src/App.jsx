import { useState } from 'react'
import { Input } from './components/forms/Input.jsx'
import { Checkbox } from './components/forms/Checkbox.jsx'
import { ProductCategoryRow } from './components/products/ProductCategoryRow.jsx'
import { ProductRow } from './components/products/ProductRow.jsx'

const PRODUCTS = [
  {id: 1,category: "Fruits", price: "$1", stocked: true, name: "Apple"},
  {id: 2,category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
  {id: 3,category: "Fruits", price: "$2", stocked: false, name: "Apple"},
  {id: 4,category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
  {id: 5,category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
  {id: 6,category: "Vegetables", price: "$1", stocked: true, name: "Peas"},
]

function App() {
  const [showStockedOnly, setShowStockedOnly] = useState(0)
  const [search, setSearch] = useState("")

  const visibleProducts = PRODUCTS.filter(product => {
    if (showStockedOnly && !product.stocked) {
      return false
    }

    if (search && !product.name.includes(search)) {
      return false
    }
    
    return true
  })

  return <div className="container my-3">
    <SearchBar showStockedOnly={showStockedOnly} onStockOnlyChange={setShowStockedOnly} search={search} onSearchChange={setSearch}/>
    <ProductTable products={visibleProducts}/>
  </div>
}

function SearchBar ({showStockedOnly, onStockOnlyChange, search, onSearchChange}) {
  return <div>
      <div className='mb-3'>
        <Input value={search} placeholder="Rechercher" onChange={onSearchChange}/>
        <Checkbox 
            id="stocked" 
            checked={showStockedOnly} 
            onChange={onStockOnlyChange} 
            label="N'afficher que les produits en stock" />
      </div>
  </div>
}

function ProductTable ({products}) {
  const rows = [];
  let lastCategory = null;

  for (let product of products) {
    if (product.category !== lastCategory) {
      rows.push(<ProductCategoryRow key={product.category} name={product.category} />);
      lastCategory = product.category;
    }
    rows.push(<ProductRow product={product} key={product.id} />);
  }

  return (
    <table className='table'>
      <thead>
        <tr>
          <th>Nom</th>
          <th>Prix</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

export default App
