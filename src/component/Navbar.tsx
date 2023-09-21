import { Button, Container, Nav, Navbar as NavbarBs } from "react-bootstrap";

export default function Navbar() {
  return (
    <NavbarBs sticky="top" className="bg-white shadow-sm mb-4">
      <Container>
        <Nav variant="tabs" style={{ fontSize: "1.5rem" }}>
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/about">About</Nav.Link>
          <Nav.Link href="/store">Store</Nav.Link>
        </Nav>
        <Button
          variant="outline-primary"
          style={{ width: "4rem", height: "4rem" }}
          className="rounded-circle position-relative"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="bi bi-cart4"
            viewBox="0 0 16 16"
          >
            <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
          </svg>
          <div
            style={{
              width: "2rem",
              height: "2rem",
              position: "absolute",
              bottom: 0,
              right: 0,
              color: "white",
            }}
            className="d-flex justify-content-center align-items-center bg-danger rounded-circle"
          >
            1
          </div>
        </Button>
      </Container>
    </NavbarBs>
  );
}
