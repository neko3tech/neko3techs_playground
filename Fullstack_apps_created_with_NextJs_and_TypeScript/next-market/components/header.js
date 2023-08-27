import Link from "next/link";

export default function Header() {
  return (
    <header>
      <div>
        <Link href={"/"} >
          <img src={"/header.svg"} />
        </Link>
      </div>
      <nav>
        <ul>
          <li><Link href={"/user/register"}>登録</Link></li>
          <li><Link href={"/user/login"}>ログイン</Link></li>
          <li><Link href={"/item/create"}>アイテム作成</Link></li>
        </ul>
      </nav>
    </header>
  )
}
