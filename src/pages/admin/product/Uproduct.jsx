import { useState } from "react";
import axios from "axios";
import Loader from "../../../components/Loader";
// import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { useParams } from "react-router-dom";

const UpdateProduct = () => {
  const [loadings, setLoadings] = useState(false);
  const [datas, setDatas] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  const SubmitHandle = async (e) => {
    e.preventDefault();

    const URL = `${import.meta.env.VITE_LOCALHOST}/api/catgeory/update/${id}`;
    await axios.put(
      URL,
      {
        name: datas.name,
      },
      { withCredentials: true }
    );

    setLoadings(true);

    setTimeout(() => {
      setLoadings(false);
      navigate("/admin/catgeory");
    }, 3000);
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
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt=""
            />
            <h1 className="text-xl font-bold text-center pb-10">
              Login in to your account
            </h1>
            <form
              className="bg-white shadow-xl p-10 flex flex-col gap-4 text-sm"
              onSubmit={SubmitHandle}
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

export default UpdateProduct;
