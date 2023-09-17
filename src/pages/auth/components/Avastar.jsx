import { useState } from "react";
import axios from "axios";

export default function Avastar() {
  const [datas, setDatas] = useState({
    avatar: "",
  });

  const [selectedImage, setSelectedImage] = useState(null);

  
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("avatar", selectedImage);

    try {
      const URL = `${import.meta.env.VITE_LOCALHOST}/api/user/avatar`;

      const response = await axios.post(URL, formData, {
        withCredentials: true,
      });

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <input
        type="file"
        accept="image/*"
        value={datas.avatar}
        onChange={(e) => setDatas({ ...datas, 
          email: e.target.value })}
      />
      <button onClick={handleSubmit}>Upload Avatar</button>
    </div>
  );
}
