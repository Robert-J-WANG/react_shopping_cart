import StoreItem from "../components/StoreItem2";
import { useShoppingCart } from "../hooks/ShoppingCartContext";

import storeItems from "../data/items.json";
import { Row, Col } from "react-bootstrap";

export function About() {
  const some = useShoppingCart();
  console.log(some);
  return (
    <>
      <h1>About </h1>
      <Row md={2} xs={1} lg={3} className="g-3">
        {storeItems.map((item) => (
          // console.log(item);
          <Col key={item.id}>
            <StoreItem {...item} />
          </Col>
        ))}
      </Row>
    </>
  );
}
