import { useEffect, useState } from "react";
import {Card, Row, Col, Form,Button, Table} from "react-bootstrap";
import { useParams } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import adminApi from "../services/adminApi";

function OrderDetails() {

  const { id } = useParams();

  const [order, setOrder] = useState(null);

  const [status, setStatus] =
    useState("Pending");
    const [discountType, setDiscountType] =
  useState("Amount");

const [discountValue, setDiscountValue] =
  useState(0);

const [finalTotal, setFinalTotal] =
  useState(0);

  const [offerMessage, setOfferMessage] =
  useState("");

  useEffect(() => {
    loadOrder();
  }, []);

  const loadOrder = async () => {

    try {

      const res =
        await adminApi.get(
          `/orders/get/${id}`
        );

      setOrder({
  ...res.data,
  items:
    typeof res.data.items === "string"
      ? JSON.parse(res.data.items)
      : res.data.items
});

      setStatus(res.data.status);
      setDiscountType(
  res.data.discount_type
);

setDiscountValue(
  res.data.discount_value
);

setFinalTotal(
  res.data.final_total
);

setOfferMessage(
  res.data.offer_message || ""
);

    } catch (err) {
      console.log(err);
    }
  };

  const saveStatus = async () => {

    try {

      await adminApi.put(
        `/orders/status/${id}`,
        {
          status,
        }
      );

      alert("Status Updated");

      loadOrder();

    } catch (err) {
      console.log(err);
    }
  };

  const saveOffer = async () => {

  try {

    const res =
      await adminApi.put(
        `/orders/offer/${id}`,
        {
          discount_type: discountType,
          discount_value: discountValue,
           offer_message: offerMessage,
        }
      );

    setFinalTotal(
      res.data.final_total
    );

    alert("Offer Updated");

    loadOrder();

  } catch (err) {

    console.log(err);

  }

};

  if (!order) return <p>Loading...</p>;

  return (

    <AdminLayout>

      <h2 className="mb-4">
        Order #{order.id}
      </h2>

      <Card className="mb-4">

        <Card.Body>

          <Row>

            <Col md={6}>
              <h5>Customer</h5>

              <p>
                <b>Name :</b> {order.name}
              </p>

              <p>
                <b>Email :</b> {order.email}
              </p>

              <p>
                <b>Phone :</b> {order.phone}
              </p>

            </Col>

            <Col md={6}>

              <h5>Address</h5>

              <p>{order.address1}</p>

              <p>{order.address2}</p>

              <p>
                {order.city},
                {" "}
                {order.state}
              </p>

              <p>
                {order.country}
              </p>

              <p>
                {order.zip}
              </p>

            </Col>

          </Row>

        </Card.Body>

      </Card>

      <Card className="mb-4">

        <Card.Body>

          <h5>
            Ordered Products
          </h5>

          <Table bordered>

            <thead>

              <tr>

                <th>Product</th>

                <th>Qty</th>

                <th>Price</th>

              </tr>

            </thead>

            <tbody>

              {order.items.map(item => (

                <tr key={item.id}>

                  <td>{item.title}</td>

                  <td>{item.quantity}</td>

                  <td>
                    £{item.price}
                  </td>

                </tr>

              ))}

            </tbody>

          </Table>

          <h4 className="text-end">

            Total :
            {" "}
            £{order.total_price}

          </h4>

        </Card.Body>

      </Card>

      <Card>

        <Card.Body>

          <Form.Group>

            <Form.Label>

              Order Status

            </Form.Label>

            <Form.Select
              value={status}
              onChange={(e)=>
                setStatus(
                  e.target.value
                )
              }
            >

              <option>
                Pending
              </option>

              <option>
                Accepted
              </option>

              <option>
                Shipped
              </option>

              <option>
                Delivered
              </option>

              <option>
                Cancelled
              </option>

            </Form.Select>

          </Form.Group>

          <Button
            className="mt-3"
            onClick={saveStatus}
          >
            Save
          </Button>

        </Card.Body>

      </Card>


      <Card className="mt-4">

  <Card.Body>

    <h5>Offer</h5>

    <Form.Group className="mb-3">

      <Form.Label>
        Discount Type
      </Form.Label>

      <Form.Select
        value={discountType}
        onChange={(e) =>
          setDiscountType(e.target.value)
        }
      >
        <option value="Amount">
          Amount (£)
        </option>

        <option value="Percentage">
          Percentage (%)
        </option>

      </Form.Select>

    </Form.Group>

    <Form.Group className="mb-3">

      <Form.Label>
        Discount Value
      </Form.Label>

      <Form.Control
        type="number"
        value={discountValue}
        onChange={(e) =>
          setDiscountValue(e.target.value)
        }
      />
      <Form.Group className="mt-3">

  <Form.Label>

    Offer Message

  </Form.Label>

  <Form.Control
    as="textarea"
    rows={5}
    value={offerMessage}
    onChange={(e)=>
      setOfferMessage(e.target.value)
    }
  />

</Form.Group>

    </Form.Group>

    <h5>

      Final Total :

      £{finalTotal}

    </h5>

    <Button
      variant="success"
      onClick={saveOffer}
    >
      Save Offer
    </Button>

  </Card.Body>

</Card>

    </AdminLayout>

  );
}

export default OrderDetails;