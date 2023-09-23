import React from "react";
import { Button, Card } from "react-bootstrap";
import { formatCurrency } from "../utils/formatCurrency";
import { useShoppingCart } from "../contex/useShoppingCart";

type StoreItemProps = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};
export default function StoreItem({ id, name, price, imgUrl }: StoreItemProps) {
  const { getQuantity, increaseQuantity, decreaseQuantity, removeFromCart } =
    useShoppingCart();
  const quantity = getQuantity(id);

  return (
    <Card className="h-100">
      <Card.Img
        src={imgUrl}
        variant="top"
        height="300px"
        className="object-fit-contain my-4"
      />
      <Card.Header>
        <Card.Title className="d-flex align-items-center justify-content-between">
          {name}{" "}
          <span
            style={{
              fontSize: ".85rem",
            }}
            className="text-muted"
          >
            {formatCurrency(price)}
          </span>
        </Card.Title>
      </Card.Header>
      <Card.Body>
        {quantity === 0 ? (
          <Button
            className="w-100 mt-auto "
            onClick={() => {
              increaseQuantity(id);
            }}
          >
            + Add to Cart
          </Button>
        ) : (
          <div className="d-flex flex-column gap-2">
            <div className="d-flex align-items-center justify-content-between">
              <Button
                className="w-25"
                onClick={() => {
                  decreaseQuantity(id);
                }}
              >
                -
              </Button>
              <span>
                <i
                  className="text-success"
                  style={{
                    fontSize: "2rem",
                    fontWeight: "bold",
                  }}
                >
                  {quantity}
                </i>{" "}
                in Cart
              </span>

              <Button
                className="w-25"
                onClick={() => {
                  increaseQuantity(id);
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
              Remove
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}
