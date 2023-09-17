import Catgeory from "../components/product/cat";
import Product from "../components/product/product";

export default function HomePage() {
  return (
    <div className="grid grid-cols-6 gap-4 items-center">
      <div className="col-span-2">
        <Catgeory />
      </div>
      <div className="col-span-4">
        <Product />
      </div>
    </div>
  );
}
