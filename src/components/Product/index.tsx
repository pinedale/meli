import { useParams } from "react-router-dom";
import { useGetProduct } from "../../hooks/useGetProduct";
import { useGetProductDescription } from "../../hooks/useGetProductDescription";
import { NumericFormat } from "react-number-format";

const Product = () => {
  const { id } = useParams();
  const { data: product } = useGetProduct(id);
  const { data: productDescription } = useGetProductDescription(id);

  if (!product) return null;

  return (
    <div className="bg-primary-gray py-4">
      <div className="max-w-default mx-auto mb-4">
        <p className="text-slate-700">Electronica, Audio y Video</p>
      </div>
      <div className="max-w-default mx-auto mb-4 bg-white pb-8">
        <div className="flex flex-col md:flex-row items-center md:items-start">
          <div className="basis-2/3 text-center align-middle p-8">
            <img src={product.pictures[0].secure_url} alt={product.title} className="inline" />
          </div>
          <div className="basis-1/3 text-slate-800 py-8 pr-8">
            <p className="mb-4">{product.condition} - {product.sold_quantity} vendidos</p>
            <h1 className="text-2xl mb-8">{product.title}</h1>
            <p className="text-5xl mb-8"><NumericFormat  value={product.price} thousandSeparator="."  decimalSeparator="," prefix="$" className="bg-white w-full" disabled/></p>
            <a href={product.permalink} className="bg-sky-500 text-white font-bold py-4 px-14 rounded hover:text-slate-50 w-full block text-center">Comprar</a>
          </div>
        </div>
        <div className="text-slate-800 px-8">
          <h2 className="text-2xl mb-8">Descripcion del producto</h2>
          <p className="mb-8">{productDescription}</p>
        </div>
      </div>
    </div>

  )
}

export default Product;
