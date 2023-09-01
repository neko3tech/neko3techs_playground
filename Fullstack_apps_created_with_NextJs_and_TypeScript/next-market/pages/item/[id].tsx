import type { NextPage, GetServerSideProps } from "next";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { SingleDataType } from "../../utils/types";

const ReadItem: NextPage<SingleDataType> = ({ data }) => {
  return (
    <div className="grid-container-si">
      <Head>
        <title>{data.title}</title>
      </Head>
      <div>
        <Image src={data.image} width="750" height="500" alt="item-image" />
      </div>
      <div>
        <h1>{data.title}</h1>
        <h2>
          {"\xA5"}
          {data.price}
        </h2>
        <hr />
        <p>{data.description}</p>
        <div>
          <Link href={`/item/update/${data._id}`}>アイテム編集</Link>
          <Link href={`/item/delete/${data._id}`}>アイテム削除</Link>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<SingleDataType> = async (context) => {
  const host = context.req.headers.host || "localhost:3000";
  const protocol = /^localhost/.test(host) ? "http" : "https";

  const response = await fetch(`${protocol}://${host}/api/item/${context.query.id}`);
  const responseJson = await response.json();

  return {
    props: responseJson,
  };
};

export default ReadItem;
