import Header from "./components/Header";
import Form from "./components/Form";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Form />
      </main>
      <Footer className="full-width" />
    </>
  );
}
