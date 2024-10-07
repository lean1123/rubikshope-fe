import { useEffect, useState } from "react";
import ProductService from "../../../services/ProductService";

export default function useProductItem(productID) {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        // setLoading(true);
        // const productApi = new ProductApi();

        // const result = await productApi.getByID(productID);

        // setProduct(result.data);

        setLoading(true);
        const product = await ProductService.getProductById(productID);
        setProduct(product);
      } catch (error) {
        console.log("Error in hook name is useVideoItem: ", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [productID]);

  return { loading, product };
}
