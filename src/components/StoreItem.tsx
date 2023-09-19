import { Card, Button } from "react-bootstrap";
import { formatCurrency } from "../utils/FormatCurrency";

type storeItemsProps = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};

export default function StoreItem({
  id,
  name,
  price,
  imgUrl,
}: storeItemsProps) {
  // 购物车里商品数量
  const quantity: number = 1;
  return (
    <Card className="h-100">
      {/* 图片 */}
      <Card.Img
        variant="top"
        src={imgUrl}
        height="250px"
        style={{
          objectFit: "contain",
          marginTop: "1rem",
        }}
      />
      <Card.Body className="d-flex flex-column ">
        {/* 名称和价格 */}
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-2">{name}</span>
          <span className="ms-3 text-muted">{formatCurrency(price)}</span>
        </Card.Title>
        {/* 增删功能 */}
        <div>
          {/*   格局商品数量，显示不同的按钮和内容 */}
          {quantity === 0 ? (
            <Button className="mt-auto w-100">+ Add to Cart</Button>
          ) : (
            <div
              className="d-flex flex-column justify-content-center align-items-center"
              style={{ gap: "0.5rem" }}
            >
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ gap: "1rem" }}
              >
                <Button>-</Button>
                <div>
                  <span className="fs-2 text-success me-2">{quantity}</span>
                  <span className="text-muted">in Cart</span>
                </div>
                <Button>+</Button>
              </div>
              <Button variant="danger">Remove</Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
