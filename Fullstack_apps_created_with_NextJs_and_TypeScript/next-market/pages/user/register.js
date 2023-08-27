import { useState } from "react";
import Head from "next/head";

export default () => {

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = ({ target }) => {
    setUser({
      ...user, [target.name]: target.value,
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/user/create", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })

      const responseJson = await response.json();
      alert(responseJson.message);

    } catch (error) {
      alert("ユーザー登録失敗");
    }
  };

  return (
    <>
      <Head><title>ユーザー登録</title></Head>
      <h1 className="page-title">ユーザー登録</h1>
      <form onSubmit={handleSubmit}>
        <input value={user.name} onChange={handleChange} type="text" name="name" placeholder="名前" required />
        <input value={user.email} onChange={handleChange} type="text" name="email" placeholder="メールアドレス" required />
        <input value={user.password} onChange={handleChange} type="text" name="password" placeholder="パスワード" required />

        <button>登録</button>
      </form>
    </>
  )
}