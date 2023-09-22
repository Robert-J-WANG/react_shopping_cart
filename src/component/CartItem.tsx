import { Button, Stack } from "react-bootstrap";
import itemsData from "../data/items.json";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utils/formatCurrency";

type CartItemProps = {
  id: number;
  quantity: number;
};
export default function CartItem({ id, quantity }: CartItemProps) {
  const item = itemsData.find((item) => item.id === id);
  const { removeFromCart } = useShoppingCart();
  if (!item) return null;
  return (
    <Stack
      gap={2}
      direction="horizontal"
      className="d-flex align-items-center justify-content-between"
    >
      <img
        src={item.imgUrl}
        style={{
          width: "125px",
          height: "75px",
          objectFit: "contain",
        }}
        alt=""
      />
      <div className="me-auto">
        <div>
          {item.name}{" "}
          {quantity > 1 && (
            <span className="text-muted" style={{ fontSize: "0.7rem" }}>
              x{quantity}
            </span>
          )}
        </div>
        <div className="text-muted" style={{ fontSize: "0.8rem" }}>
          {formatCurrency(item.price)}
        </div>
      </div>
      <div>{formatCurrency(item.price * quantity)}</div>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => {
          removeFromCart(id);
        }}
      >
        &times;
      </Button>
    </Stack>
  );
}
