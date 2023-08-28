import { useState } from "react";

export default function ImageInput(props) {
  const [imageFile, setImageFile] = useState("");

  const handlClick = async () => {
    try {
      console.log("===>", process.env);
      const data = new FormData();
      data.append("file", imageFile);
      data.append("cloud_name", "nekoteckmarket");
      data.append("upload_preset", "MarketImages");
      const res = await fetch("https://api.cloudinary.com/v1_1/nekoteckmarket/image/upload", {
        method: "POST",
        body: data,
      });
      const resJson = await res.json();
      console.log('resJson: ', resJson);
      await props.setItem(
        {
          ...props.item,
          image: resJson.url
        });
      alert("画像アップロード成功");
    } catch (error) {
      alert("画像アップロード失敗：" + error.message);
    }
  };

  return (
    <div className="img-input">
      <input type="file" onChange={(e) => setImageFile(e.target.files[0])} accept="image/*" />
      <button onClick={handlClick} disabled={!imageFile}>画像アップロード</button>
    </div>
  )
}
