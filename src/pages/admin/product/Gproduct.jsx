import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

const GetProduct = () => {
  const [product, setProducts] = useState([]);
  // const navigate = useNavigate();

  //get all cat
  const getAllProducts = async () => {
    try {
      const URL = `${import.meta.env.VITE_LOCALHOST}/api/product/get`;

      const { data } = await axios.get(URL, { withCredentials: true });

      if (data?.products) {
        setProducts(data?.products);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wwent wrong in getting catgeory");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  //delete category
  const handleDelete = async (id) => {
    const URL = `${import.meta.env.VITE_LOCALHOST}/api/product/delete/${id}`;
    try {
      const { data } = await axios.delete(URL);
      if (data.products) {
        toast.success(`category is deleted`);
        getAllProducts();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Somtihing went wrong");
    }
  };
  return (
    <div className="container-fluid m-3 p-3 dashboard">
      <div className="row">
        <div className="col-md-9">
          <h1>Manage Products</h1>
          <div className="w-75">
            <table className="table">
              <thead>
                <tr className="mt-2 space-x-4">
                  <th scope="col">Image</th>
                  <th scope="col">Name</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {product?.map((c) => (
                  <>
                    <tr key={c._id}>
                      <td >{c.name}</td>
                      <td>
                        <img src={c.photo} alt="jhjh" />
                      </td>
                      <td>
                        <button
                          className="btn btn-danger ms-2"
                          onClick={() => {
                            handleDelete(c._id);
                          }}
                        >
                          Delete
                        </button>
                        <a
                          href={`/admin/catgeory/update/${c._id}`}
                          className="btn btn-danger ms-2"
                        >
                          Edit
                        </a>
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetProduct;
