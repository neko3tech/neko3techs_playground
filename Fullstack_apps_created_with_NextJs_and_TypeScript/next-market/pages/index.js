import Link from "next/link";
import Image from "next/image";

export default ({ data }) => {
  return (
    <>
      <div>
        {data.map(item =>
          <Link key={item._id} href={`item/${item._id}`}>
            <Image src={item.image} width="750" height="500" alt="item-image" />
            <div>
              <h2>{item.price}</h2>
              <h3>{item.title}</h3>
              <p>{item.description.substring(0, 80)}...</p>
            </div>
          </Link>
        )}
      </div>
    </>
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
