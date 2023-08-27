import Link from "next/link";
import Image from "next/image";
import Head from "next/head";

export default ({ data }) => {

  return (
    <div >
      <Head><title>NekoTech Market</title></Head>
      <div className="grid-container-in">
        {data.map(item =>
          <Link key={item._id} href={`item/${item._id}`}>
            <Image src={item.image} width="750" height="500" alt="item-image" />
            <div className="text-area">
              <h2>{"\xA5"}{item.price}</h2>
              < h3 > {item.title}</h3>
              <p>{item.description.substring(0, 80)}...</p>
            </div>
          </Link>
        )}
      </div>
    </div>
  )
};

export const getServerSideProps = async (context) => {

  const host = context.req.headers.host || 'localhost:3000'
  const protocol = /^localhost/.test(host) ? 'http' : 'https'

  const response = await fetch(`${protocol}://${host}/api/item/readall`);
  const responseJson = await response.json();

  return {
    props: responseJson,
  }
};
