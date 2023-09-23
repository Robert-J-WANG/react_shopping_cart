import React from "react";
import itemData from "../data/items.json";
import { Button, Image, Row, Stack } from "react-bootstrap";
import { formatCurrency } from "../utils/formatCurrency";
import { useShoppingCart } from "../contex/useShoppingCart";

type CartItemProps = {
  id: number;
  quantity: number;
};
export default function CartItem({ id, quantity }: CartItemProps) {
  const { removeFromCart } = useShoppingCart();
  const item = itemData.find((i) => i.id === id);
  if (item == null) return null;
  return (
    <Stack direction="horizontal" gap={2}>
      <Image
        src={item.imgUrl}
        width={"150px"}
        height={"100px"}
        className="object-fit-contain"
      />
      <div className="mx-auto">
        <div>
          {item.name} x {quantity}
        </div>
        <div>{formatCurrency(item.price)}</div>
      </div>
      <div>{formatCurrency(item.price * quantity)}</div>
      <Button
        variant="outline-danger"
        onClick={() => {
          removeFromCart(id);
        }}
      >
        &times;
      </Button>
    </Stack>
  );
}
