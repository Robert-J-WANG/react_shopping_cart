import { Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Store } from "./pages/Store";
import Navbar from "./components/Navbar";
import { ShoppingCartProvider } from "./hooks/ShoppingCartContext";

function App() {
  return (
    // 整个里的任何一个组件都成为了usecontext的provider
    <ShoppingCartProvider>
      <Navbar></Navbar>
      <Container className="mb-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/store" element={<Store />} />
        </Routes>
      </Container>
    </ShoppingCartProvider>
  );
}

export default App;
