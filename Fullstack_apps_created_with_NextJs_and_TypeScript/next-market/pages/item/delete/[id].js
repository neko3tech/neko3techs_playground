import Image from "next/image";
import Head from "next/head";
import useAuth from "../../../utils/useAuth";

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

  const loginUser = useAuth();

  if (loginUser === data.email) {
    return (
      <div className="delete-page">
        <Head><title>アイテム削除</title></Head>
        <h1 className="page-title">アイテム削除</h1>
        <form onSubmit={handleSubmit}>
          <h2>{data.title}</h2>
          <Image src={data.image} width={750} height={500} alt="item-image" />
          <h3>{"\xA5"}{data.price} </h3>
          <p> {data.description} </p>
          <button>削除</button>
        </form>
      </div>
    );
  } else {
    return <h1>権限がありません</h1>
  }
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
