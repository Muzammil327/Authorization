import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

const GetCategory = () => {
  const [categories, setCategories] = useState([]);
  // const navigate = useNavigate();

  //get all cat
  const getAllCategory = async () => {
    try {
      const URL = `${import.meta.env.VITE_LOCALHOST}/api/catgeory/get`;

      const { data } = await axios.get(URL, { withCredentials: true });
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wwent wrong in getting catgeory");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //delete category
  const handleDelete = async (id) => {
    const URL = `${import.meta.env.VITE_LOCALHOST}/api/catgeory/delete/${id}`;
    try {
      const { data } = await axios.delete(URL);
      if (data.success) {
        toast.success(`category is deleted`);
        getAllCategory();
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
          <h1>Manage Category</h1>
          <div className="w-75">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories?.map((c) => (
                  <>
                    <tr>
                      <td key={c._id}>{c.name}</td>
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

export default GetCategory;
