import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import CartItem from "./CartItem";
import dataItems from "../data/items.json";
import { formatCurrency } from "../utils/formatCurrency";

export default function ShoppingCart() {
  const { isOpen, closeCart, cartItems } = useShoppingCart();
  return (
    <Offcanvas show={isOpen} placement="end" onHide={closeCart}>
      <Offcanvas.Header closeButton>Your Items</Offcanvas.Header>
      <Offcanvas.Body className="">
        <Stack gap={3} direction="vertical">
          {cartItems.map((item) => {
            return <CartItem key={item.id} {...item} />;
          })}

          <div className="ms-auto fw-bold mt-3 fs-5">
            Total:{" "}
            {formatCurrency(
              cartItems.reduce((total, item) => {
                const dataItem = dataItems.find((i) => i.id === item.id);
                return total + (dataItem?.price || 0) * item.quantity;
              }, 0)
            )}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
