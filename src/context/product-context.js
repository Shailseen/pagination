import { createContext } from "react";
import { useContext } from "react";
import { useState } from "react";
import axios from 'axios'

const ProductContext = createContext();

const useProduct = () => useContext(ProductContext);

const ProductProvider = ({ children }) => {
  const [productsData,setProductsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const getMoreProducts =async (skip,setHasMore) => {
        try {
          setIsLoading(true);
          const { data } = await axios.get(
            `https://dummyjson.com/products?skip=${skip}&limit=5`
          );
          const { products } = data;
          if (products.length===0) setHasMore(false);
          setIsLoading(false);
          setProductsData(prevProduct => [...prevProduct,...products]);
        } catch (error) {
          setIsLoading(false);
        }
  }
  return (
    <ProductContext.Provider value={{ productsData, getMoreProducts , isLoading}}>
      {children}
    </ProductContext.Provider>
  );
};

export { useProduct, ProductProvider };
