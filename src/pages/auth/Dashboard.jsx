import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import {Link} from 'react-router-dom'

export default function DashboardPage() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    
    const URL = `${import.meta.env.VITE_LOCALHOST}/api/user`;
    axios
      .get(URL, {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  return (
    <div className="container mx-auto px-6">
      <div className=" pb-7">
        <div className="grid grid-cols-6 gap-4 my-6">
          <div className="col-span-2 relative">
           
            <div className="pl-8 text-xl font-semibold text-center">
              <span>{user.username}</span> <br />
              <span>{user.email}</span>
            </div>
            <Link 
       to={`/dashboard/update/${user.id}`}
       className="bg-red-500 py-2 px-6 text-white">Update</Link>
           
          </div>
          <div className="col-span-4">Right Side</div>
        </div>
      </div>
      </div>

  );
}
