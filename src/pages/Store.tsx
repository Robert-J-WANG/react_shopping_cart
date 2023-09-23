import React from "react";
import { Col, Row } from "react-bootstrap";
import itemsDate from "../data/items.json";
import StoreItem from "../components/StoreItem";

export default function Store() {
  return (
    <>
      <Row xs={1} md={2} lg={3}>
        {itemsDate.map((item) => (
          <Col className="g-4" key={item.id}>
            <StoreItem {...item} />
          </Col>
        ))}
      </Row>
    </>
  );
}
