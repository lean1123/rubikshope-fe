import { useEffect, useState } from "react";
import ProductApi from "../../../api/admin/product/ProductApi";

export default function useProductItem(productID) {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const productApi = new ProductApi();

        const result = await productApi.getByID(productID);

        setProduct(result.data);
      } catch (error) {
        console.log("Error in hook name is useVideoItem: ", error);
      }

      setLoading(false);
    })();
  }, [productID]);

  return { loading, product };
}
