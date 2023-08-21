import Image from "next/image";

export default ({ data }) => {
  const handleChange = ({ target }) => {
    setItem({
      ...item,
      [target.name]: target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/item/delete/${data._id}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const responseJson = await response.json();
      alert(responseJson.message);
    } catch (error) {
      alert("アイテム削除失敗");
    }
  };

  return (
    <>
      <h1>アイテム削除</h1>
      <form onSubmit={handleSubmit}>
        <h2>{data.title}</h2>
        <Image src={data.image} width={750} height={500} alt="item-image" />
        <h3> \{data.price} </h3>
        <p> {data.description} </p>
        <button>削除</button>
      </form>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const host = context.req.headers.host || "localhost:3000";
  const protocol = /^localhost/.test(host) ? "http" : "https";

  const response = await fetch(`${protocol}://${host}/api/item/${context.query.id}`);

  console.log(`${protocol}://${host}/api/item/${context.query.id}`);
  const responseJson = await response.json();

  return {
    props: responseJson,
  };
};
