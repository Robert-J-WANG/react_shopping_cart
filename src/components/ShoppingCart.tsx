import React from "react";
import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../contex/useShoppingCart";
import CartItem from "./CartItem";
import { formatCurrency } from "../utils/formatCurrency";
import itemData from "../data/items.json";

export default function ShoppingCart() {
  const { isOpen, closeCart, cartItems } = useShoppingCart();
  return (
    <Offcanvas
      placement="end"
      show={isOpen}
      onHide={() => {
        closeCart();
      }}
    >
      <Offcanvas.Header closeButton>CART ITEMS</Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3} direction="vertical">
          {cartItems.map((item) => {
            return <CartItem key={item.id} {...item} />;
          })}
          <div className="ms-auto fw-bold mt-3 fs-5">
            Total:{" "}
            <span>
              {formatCurrency(
                cartItems.reduce((total, cartItem) => {
                  const item = itemData.find((i) => i.id === cartItem.id);
                  return total + (item?.price || 0) * cartItem.quantity;
                }, 0)
              )}
            </span>
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
