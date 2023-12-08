import axios from "axios";
import { useState } from "react";
import { useNavigate,useParams } from "react-router-dom";
import Loader from "../Loader";
import { useSelector } from "react-redux";
import { update } from "../../redux/slices/auth";
import { useDispatch } from "react-redux";

const Updated = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
console.log("start")
  const user = useSelector((state) => state.user.user);

  
  const [datas, setDatas] = useState({
    username: user.usename,
    email: user.email,
  });
  console.log("datas", datas)
  const [loadings, setLoadings] = useState(false);
  const { id } = useParams();

  const SubmitHandle = async (e) => {
    e.preventDefault();
 
    const URL = `${import.meta.env.VITE_LOCALHOST}/api/user/update/${id}`;
    const res = await axios.put(
      URL,
      { 
        email: datas.email, 
        username: datas.username,
      },
      { withCredentials: true }
    );
   
    localStorage.setItem("user", JSON.stringify(res.data.category));
    setLoadings(true);

    
    setTimeout(() => {
      setLoadings(false);
      navigate("/dashboard");
      dispatch(update(res.data.user));
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
              alt="bvgnl"
            />
            <h1 className="text-xl font-bold text-center pb-10">
              Register to your account
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
                  Username
                </label>
                <input
                  className="border border-gray-400 focus:outline-slate-400 rounded-md w-full shadow-sm px-5 py-2"
                  type="name"
                  name="name"
                  value={datas.username}
                  onChange={(e) =>
                    setDatas({ ...datas, username: e.target.value })
                  }
                  placeholder="Your Username"
                />
              </div>
              <div>
                <label
                  className="text-gray-600 font-bold inline-block pb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="border border-gray-400 focus:outline-slate-400 rounded-md w-full shadow-sm px-5 py-2"
                  type="email"
                  name="email"
                  value={datas.email}
                  onChange={(e) =>
                    setDatas({ ...datas, email: e.target.value })
                  }
                  placeholder="mehedi@jaman.com"
                />
              </div>
            
              <div>
                <input
                  className="bg-[#4F46E5] w-full py-2 rounded-md text-white font-bold cursor-pointer hover:bg-[#181196]"
                  type="submit"
                  defaultValue="Register"
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Updated;
