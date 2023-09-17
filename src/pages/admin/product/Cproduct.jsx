import { useState } from "react";
import axios from "axios";
import Loader from "../../../components/Loader";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const [datas, setDatas] = useState({
    name: "",
    // description: "",
    // price: "",
    // category: "",
    // quantity: ""
    photo: null,
  });
 

  const handleFileChange = (e) => {
    setDatas({ photo: e.target.files[0] });
  };
  const [loadings, setLoadings] = useState(false);
  // const [categories, setCategories] = useState([]);
  // const navigate = useNavigate();
  //get all cat
  // const getAllCategory = async () => {
  //   try {
  //     const URL = `${import.meta.env.VITE_LOCALHOST}/api/catgeory/get`;

  //     const { data } = await axios.get(URL, { withCredentials: true });
  //     if (data?.success) {
  //       setCategories(data?.category);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Something wwent wrong in getting catgeory");
  //   }
  // };

  // useEffect(() => {
  //   getAllCategory();
  // }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', datas.name);
    // formData.append('description', datas.description);
    // formData.append('price', datas.price);
    // formData.append('quantity', datas.quantity);
    // formData.append('category', datas.category);
    formData.append("photo", datas.photo);
   
    try {
      const URL = `${import.meta.env.VITE_LOCALHOST}/api/product/create`;
      const {data} = await axios.post(
        URL,
        formData,
        { withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data', 
          },
        },
      );
      console.log(data)
      // if (res.data.error) {
      //   toast.error(res.data.error);
      // } else {
      //   toast.success(res.data.message);
      //   setLoadings(true);
      //   setTimeout(() => {
      //     navigate("/");
      //     setLoadings(false);
      //   }, 3000);
      //   console.log(res)
      // }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {loadings ? (
        <Loader />
      ) : (
        <div className="bg-[#F9FAFB] h-screen w-screen flex items-center">
          <div className="h-max mx-auto flex flex-col items-center">
            <img
              className="h-[40px] w-[47px] mb-5"
              src="http://localhost:8000/admin/public/image/product/muzammal.jpg"
              alt=""
            />
            <h1 className="text-xl font-bold text-center pb-10">
              Login in to your account
            </h1>
            <form
              className="bg-white shadow-xl p-10 flex flex-col gap-4 text-sm"
              onSubmit={handleSubmit}
            >
             <div>
                <label
                  className="text-gray-600 font-bold inline-block pb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className="border border-gray-400 focus:outline-slate-400 rounded-md w-full shadow-sm px-5 py-2"
                  type="name"
                  name="name"
                  value={datas.name}
                  onChange={(e) => setDatas({ ...datas, name: e.target.value })}
                  placeholder="add catgeory here"
                />
              </div>
               {/* <div>
                <label
                  className="text-gray-600 font-bold inline-block pb-2"
                  htmlFor="description"
                >
                  Description
                </label>
                <input
                  className="border border-gray-400 focus:outline-slate-400 rounded-md w-full shadow-sm px-5 py-2"
                  type="text"
                  name="description"
                  value={datas.description}
                  onChange={(e) =>
                    setDatas({ ...datas, description: e.target.value })
                  }
                  placeholder="add description here"
                />
              </div>
              <div>
                <label
                  className="text-gray-600 font-bold inline-block pb-2"
                  htmlFor="price"
                >
                  Price
                </label>
                <input
                  className="border border-gray-400 focus:outline-slate-400 rounded-md w-full shadow-sm px-5 py-2"
                  type="number"
                  name="price"
                  value={datas.price}
                  onChange={(e) =>
                    setDatas({ ...datas, price: e.target.value })
                  }
                  placeholder="add price here"
                />
              </div>
              <div>
                <label
                  className="text-gray-600 font-bold inline-block pb-2"
                  htmlFor="quantity"
                >
                  Quantity
                </label>
                <input
                  className="border border-gray-400 focus:outline-slate-400 rounded-md w-full shadow-sm px-5 py-2"
                  type="number"
                  name="quantity"
                  value={datas.quantity}
                  onChange={(e) =>
                    setDatas({ ...datas, quantity: e.target.value })
                  }
                  placeholder="add quantity here"
                />
              </div> */}
              <div>
                <label
                  className="text-gray-600 font-bold inline-block pb-2"
                  htmlFor="Image"
                >
                  Image
                </label>
                
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  // onChange={(e) => setPhoto(e.target.files[0])}
                  onChange={handleFileChange}
                  />
              </div>
              {/* <div>
                <label
                  className="text-gray-600 font-bold inline-block pb-2"
                  htmlFor="category"
                >
                  Category
                </label>
                <select
                  id="cars"
                  className="border border-gray-400 focus:outline-slate-400 rounded-md w-full shadow-sm px-5 py-2"
                  value={datas.category}
                  onChange={(e) =>
                    setDatas({ ...datas, category: e.target.value })
                  }
                >
                  {categories?.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div> */}

              <div>
                <input
                  className="bg-[#4F46E5] w-full py-2 rounded-md text-white font-bold cursor-pointer hover:bg-[#181196]"
                  type="submit"
                  defaultValue="Add Catgeory"
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateProduct;
