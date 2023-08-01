import * as React from "react";
import Layout from "../components/layout";
import * as style from "../styles/contact.module.scss";

const Contact = () => {
    return (
        <Layout title="Contact">
            <div className={style.wrapper}>
                <div className={style.container}>
                    <h1>Contact</h1>
                    <p>お気軽にご連絡ください</p>
                    <form>
                        <label htmlFor="name">おなまえ</label>
                        <input type="text" name="name" id="name" required />
                        <label htmlFor="email">メールアドレス</label>
                        <input type="email" name="email" id="email" required />
                        <label htmlFor="message">メッセージ</label>
                        <textarea name="message" id="message" rows="10" required ></textarea>
                        <button type="submit">送信</button>
                    </form>
                </div>
            </div>
        </Layout>
    )
};

export default Contact;
