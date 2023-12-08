import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";

import { toast } from "react-toastify";
const Register = () => {
  const navigate = useNavigate();
  const [loadings, setLoadings] = useState(false);

  const [datas, setDatas] = useState({
    username: "",
    email: "",
    password: "",
  });
  const SubmitHandle = async (e) => {
    e.preventDefault();
    try {
      const URL = `${import.meta.env.VITE_LOCALHOST}/api/register`;
      const res = await axios.post(
        URL,
        { 
          username: datas.username, 
          email: datas.email, 
          password: datas.password 
        },
        { withCredentials: true }
      );

      if (res.data.error) {
        toast.error(res.data.error);
        console.log(res.data.error);
      } else {
        toast.success(res.data.message);
        setLoadings(true);
        localStorage.setItem("user", JSON.stringify(res.data.user));


        setTimeout(() => {
          setLoadings(false);
          navigate("/login");
        }, 3000);
      }
    } catch (error) {
      console.log(error);
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
                  // defaultValue="Register"
                  defaultValue={loadings ? "Register":"Loading"}
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
