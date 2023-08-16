import { useState } from "react";

export default () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
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
        <input value={email} onChange={e => setEmail(e.target.value)} type="text" name="email" placeholder="メールアドレス" required />
        <input value={password} onChange={e => setPassword(e.target.value)} type="text" name="password" placeholder="パスワード" required />

        <button>ログイン</button>
      </form>
    </>
  )
}