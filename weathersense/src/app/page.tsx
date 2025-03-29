import Header from "./components/Header";
import Form from "./components/Form";
import Forecast from "./components/Forecast";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Form />
        <Forecast />
      </main>
      <Footer className="full-width" />
    </>
  );
}
