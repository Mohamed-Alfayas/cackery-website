import React, { useState } from "react";
import ReactSelect from "react-select";
import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  FormLabel,
  Row,
} from "react-bootstrap";

const Category = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [mainCategory, setMainCategory] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [details, setDetails] = useState({
    value: "",
  });

  const options = [
    { value: "chocolate", FormLabel: "Chocolate" },
    { value: "strawberry", FormLabel: "Strawberry" },
    { value: "vanilla", FormLabel: "Vanilla" },
  ];

  const data = [
    {
      id: 1,
      value: "first",
    },
    {
      id: 2,
      value: "second",
    },
    {
      id: 3,
      value: "third",
    },
  ];

  const handleCheckbox = () => {
    setIsChecked(!isChecked);
    setSelectedOption("");
  };
  const handleOnChange = (value, name) => {
    setDetails((oldData) => ({
      ...oldData,
      [name]: value,
    }));
    const filtered = data?.filter((val) => val?.value === value);
    if (filtered?.length) {
      setMainCategory(true);
    } else {
      setMainCategory(false);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted");
  };
  return (
    <Container>
      <Row>
        <h1>Choose Category</h1>
        <Col>
          <Form onSubmit={handleSubmit}>
            <FormLabel>Check Category</FormLabel>
            <FormControl
              type="text"
              value={details?.value}
              onChange={(e) => handleOnChange(e.target?.value, "value")}
              required
            />
            <FormControl
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckbox}
            />
            {isChecked && (
              <ReactSelect
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
                required
              />
            )}
            <Button type="submit">Submit</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Category;
