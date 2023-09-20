import { Button, Stack } from "react-bootstrap";
import storeItems from "../data/items.json";
import { formatCurrency } from "../utils/formatCurrency";
import { useShoppingCart } from "../hooks/ShoppingCartContext";
type CartItemProps = {
  id: number;
  quantity: number;
};
export default function CartItem({ id, quantity }: CartItemProps) {
  const { removeFromCard } = useShoppingCart();
  const item = storeItems.find((i) => i.id === id);
  if (item == null) return null;
  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img
        src={item.imgUrl}
        width={"150px"}
        height={"100px"}
        style={{ objectFit: "contain" }}
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
        onClick={() => removeFromCard(id)}
      >
        &times;
      </Button>
    </Stack>
  );
}
