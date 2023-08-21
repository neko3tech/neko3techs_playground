import Link from "next/link";
import Image from "next/image";

export default ({ data }) => {
  return (
    <>
      <div>
        <Image src={data.image} width="750" height="500" alt="item-image" />
      </div>
      <div>
        <h1>{data.title}</h1>
        <h2>{data.price}</h2>
        <hr />
        <p>{data.description}</p>
        <div>
          <Link href={`/item/update/${data._id}`} >アイテム編集</Link>
          <Link href={`/item/delete/${data._id}`} >アイテム削除</Link>
        </div>
      </div>
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
