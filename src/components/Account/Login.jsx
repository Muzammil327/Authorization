import { useState } from "react";
import { useDispatch } from "react-redux";
import Loader from "../Loader";
import { login } from "../../redux/slices/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Login = () => {
  const [loadings, setLoadings] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [datas, setDatas] = useState({
    email: "",
    password: "",
  });

  const SubmitHandle = async (e) => {
    e.preventDefault();

    const URL = `${import.meta.env.VITE_LOCALHOST}/api/login`;
    const res = await axios.post(
      URL,
      { email: datas.email, password: datas.password },
      { withCredentials: true }
    );
    if (res.data.error) {
      toast.error(res.data.error);
    } else {
      toast.success(res.data.message);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setLoadings(true);
      dispatch(login(res.data.user));

      setTimeout(() => {
        navigate("/dashboard");
        setLoadings(false);
      }, 3000);
    }
  };

  return (
    <>
      {loadings ? (
        <Loader />
      ) : (
        <div className="bg-[#F9FAFB] py-20 w-screen flex items-center">
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
                <label
                  className="text-gray-600 font-bold inline-block pb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="border border-gray-400 focus:outline-slate-400 rounded-md w-full shadow-sm px-5 py-2"
                  type="password"
                  value={datas.password}
                  onChange={(e) =>
                    setDatas({ ...datas, password: e.target.value })
                  }
                  name="password"
                  placeholder="******"
                />
              </div>
              <div>
                <input
                  className="bg-[#4F46E5] w-full py-2 rounded-md text-white font-bold cursor-pointer hover:bg-[#181196]"
                  type="submit"
                  defaultValue="Login"
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
