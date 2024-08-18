import { useEffect, useState } from "react";
import { Product } from "./Product";
import { productAPI } from "./ProductAPI";
import ProductCard from "./ProductCard";
import toast from "react-hot-toast";

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [busy, setBusy] = useState(false);

  async function loadProducts() {
    setBusy(true);
    let data = await productAPI.list();
    setProducts(data);
    setBusy(false);
  }

  //side effect: bringing new data
  //useEffect wants to have a function or nothing returned, that's why we need to pass loadProducts
  //the array [] means "how often do you want to run the function?" -> render the page blank and after the first render, run ProductList top to bottom again
  useEffect(() => {
    loadProducts();
  }, []);

  async function remove(product: Product) {
    if (confirm("Are you sure you want to delete this Product?")) {
      if (product.id) {
        await productAPI.delete(product.id);
        let updatedProducts = products.filter((v) => v.id !== product.id);
        setProducts(updatedProducts);
        toast.success("Successfully deleted.");
      }
    }
  }

  return (
    <section className="list d-flex flex-row flex-wrap bg-light gap-5 p-4 rounded-4">
      {busy && (
        <div className="d-flex justify-content-center align-items-center w-100 vh-100">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {products.map((product) => (
        <ProductCard key={product.id} product={product} onRemove={remove} />
      ))}
    </section>
  );
}
