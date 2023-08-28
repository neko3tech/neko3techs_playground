import { useState } from "react";
import Head from "next/head";
import useAuth from "../../utils/useAuth";
import ImageInput from "../../components/ImageInput";

export default () => {

  const [item, setItem] = useState({
    title: "",
    price: "",
    image: "",
    description: "",
  });

  const handleChange = ({ target }) => {
    setItem({
      ...item, [target.name]: target.value,
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/item/create", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(item),
      })

      const responseJson = await response.json();
      alert(responseJson.message);

    } catch (error) {
      alert("アイテム登録失敗");
    }
  };

  const loginUser = useAuth();

  if (loginUser) {
    return (
      <div>
        <Head><title>アイテム作成</title></Head>
        <h1 className="page-title">アイテム作成</h1>
        <ImageInput item={item} setItem={setItem} />
        <form onSubmit={handleSubmit}>
          <input value={item.title} onChange={handleChange} type="text" name="title" placeholder="アイテム名" required />
          <input value={item.price} onChange={handleChange} type="text" name="price" placeholder="価格" required />
          <input value={item.image} onChange={handleChange} type="text" name="image" placeholder="画像" required />
          <textarea value={item.description} onChange={handleChange} name="description" rows={15} placeholder="説明" required></textarea>

          <button>作成</button>
        </form>
      </div>
    )
  }
};
