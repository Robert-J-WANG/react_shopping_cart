import { Col, Row } from "react-bootstrap";
import StoreItem from "../component/StoreItem";
import items from "../data/items.json";

export default function Store() {
  return (
    <>
      <h1>Store</h1>
      <Row md={2} xs={1} lg={3} className="g-3">
        {items.map((item) => {
          return (
            <Col key={item.id}>
              <StoreItem {...item} />
            </Col>
          );
        })}
      </Row>
    </>
  );
}
