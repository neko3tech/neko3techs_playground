import { useState } from "react";

export default () => {

  const [user, setUser] = useState({
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
      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })

      const responseJson = await response.json();
      localStorage.setItem("token", responseJson.token);

      alert(responseJson.message);

    } catch (error) {
      alert("ログイン失敗");
    }
  };

  return (
    <>
      <h1>ログイン</h1>
      <form onSubmit={handleSubmit}>
        <input value={user.email} onChange={handleChange} type="text" name="email" placeholder="メールアドレス" required />
        <input value={user.password} onChange={handleChange} type="text" name="password" placeholder="パスワード" required />

        <button>ログイン</button>
      </form>
    </>
  )
}