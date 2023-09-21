import { Container } from "react-bootstrap";
import Navbar from "./component/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Store from "./pages/Store";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";

function App() {
  return (
    <ShoppingCartProvider>
      <Navbar></Navbar>
      <Container>
        <Routes>
          <Route path="/" element={<Home />}>
            HOME
          </Route>
          <Route path="/about" element={<About />}>
            About
          </Route>
          <Route path="/store" element={<Store />}>
            Store
          </Route>
        </Routes>
      </Container>
    </ShoppingCartProvider>
  );
}

export default App;
