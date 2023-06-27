import * as React from "react";
import Layout from "../components/layout";

const Contact = () => {
    return (
        <Layout>
            <div>
                <div>
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
