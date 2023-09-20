import { useContext } from "react";
import { Offcanvas } from "react-bootstrap";
import { useShoppingCart } from "../hooks/ShoppingCartContext";

export default function ShoppingCart() {
  const { closeCart } = useShoppingCart();
  return (
    <Offcanvas show={true} placement="end">
      <Offcanvas.Header closeButton onHide={closeCart}>
        <Offcanvas.Title>CART</Offcanvas.Title>
      </Offcanvas.Header>
    </Offcanvas>
  );
}
