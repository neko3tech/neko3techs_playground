import { useState } from "react";

export default ({ data }) => {

  const [item, setItem] = useState({
    title: data.title,
    price: data.price,
    image: data.image,
    description: data.description,
  });

  const handleChange = ({ target }) => {
    setItem({
      ...item, [target.name]: target.value,
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/item/update/${data._id}`, {
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
      alert("アイテム編集失敗");
    }
  };

  return (
    <>
      <h1>アイテム編集</h1>
      <form onSubmit={handleSubmit}>
        <input value={item.title} onChange={handleChange} type="text" name="title" placeholder="アイテム名" required />
        <input value={item.price} onChange={handleChange} type="text" name="price" placeholder="価格" required />
        <input value={item.image} onChange={handleChange} type="text" name="image" placeholder="画像" required />
        <textarea value={item.description} onChange={handleChange} name="description" rows={15} placeholder="説明" required></textarea>

        <button>編集</button>
      </form>
    </>
  )
};

export const getServerSideProps = async (context) => {

  const host = context.req.headers.host || 'localhost:3000'
  const protocol = /^localhost/.test(host) ? 'http' : 'https'

  const response = await fetch(`${protocol}://${host}/api/item/${context.query.id}`);

  console.log(`${protocol}://${host}/api/item/${context.query.id}`);
  const responseJson = await response.json();

  return {
    props: responseJson,
  }
};
