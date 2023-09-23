import { Button, Card } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utils/formatCurrency";
type StoreItemProps = {
  id: number;
  name: string;
  imgUrl: string;
  price: number;
};
export default function StoreItem({ id, name, imgUrl, price }: StoreItemProps) {
  const {
    getItemQuantity,
    increaseItemQuantity,
    decreaseItemQuantity,
    removeFromCart,
  } = useShoppingCart();
  let quantity = getItemQuantity(id);
  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={imgUrl}
        style={{
          height: "250px",
          objectFit: "contain",
          marginTop: "1rem",
        }}
      />
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-center">
          <span>{name}</span>
          <span
            className="text-muted"
            style={{
              fontSize: ".8rem",
            }}
          >
            {formatCurrency(price)}
          </span>
        </Card.Title>
        {quantity === 0 ? (
          <Button
            className="w-100 mt-auto"
            onClick={() => {
              increaseItemQuantity(id);
            }}
          >
            + Add{" "}
          </Button>
        ) : (
          <div className="d-flex flex-column justify-content-center align-items-center gap-1">
            <div>
              <Button
                onClick={() => {
                  decreaseItemQuantity(id);
                }}
              >
                -
              </Button>{" "}
              {quantity}{" "}
              <Button
                onClick={() => {
                  increaseItemQuantity(id);
                }}
              >
                +
              </Button>
            </div>
            <Button
              variant="danger"
              onClick={() => {
                removeFromCart(id);
              }}
            >
              remove
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}
