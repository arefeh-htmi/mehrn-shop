import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import {
  listProductDetails,
  createProduct,
  updateProduct,
} from "../../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../../constants/productConstants";
import SelectOption from "../Common/SelectOption";

const Add = ({ match, history }) => {
  // const {
  //   user,
  //   productFormData,
  //   formErrors,
  //   productChange,
  //   addProduct,
  //   brands,
  //   // image,
  // } = props;
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = productCreate;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const brands = useSelector((state) => state.brands);
  useEffect(() => {
    if (!userInfo || !userInfo.role === "ROLE_ADMIN" || !userInfo.role === "ROLE_MERCHANT") {
      history.push("/login");
    }
    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      history.push("/dashboard/productlist");
    } else {
      console.log("err");
    }
  }, [
    dispatch,
    history,
    loadingCreate,
    errorCreate,
    userInfo,
    brands,
    successCreate,
    successCreate,
  ]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProduct({
        name,
        price,
        image,
        brand,
        description,
        countInStock,
      })
    );
  };

  return (
    <>
      <Link to="/dashboard/productlist" className="btn btn-light my-3">
        <i class="fas fa-angle-left go-back-icon"></i>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingCreate && <Loader />}
        {errorCreate && <Message variant="danger">{errorCreate}</Message>}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName("name", e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice("price", e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="image">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter image url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            ></Form.Control>
            <Form.File
              id="image-file"
              label="Choose File"
              custom
              onChange={uploadFileHandler}
            ></Form.File>
            {uploading && <Loader />}
          </Form.Group>

          <Form.Group controlId="brand">
            {/* <Form.Label>Brand</Form.Label> */}
            <SelectOption
              disabled={userInfo.role === "ROLE_MERCHANT"}
              // error={formErrors["brand"]}
              label={"Select Brand"}
              value={userInfo.role === "ROLE_MERCHANT" ? brands[1] : brand}
              options={brands}
              handleSelectChange={(value) => {
                setBrand(value);
              }}
            />
          </Form.Group>

          <Form.Group controlId="countInStock">
            <Form.Label>Count In Stock</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter countInStock"
              value={countInStock}
              onChange={(e) => setCountInStock("countInStock", e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription("description", e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary">
            Submit
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};
// const mapStateToProps = (state) => {
//   return {
//     userInfo: state.userLogin.userInfo,
//     productFormData: state.product.productFormData,
//     formErrors: state.product.formErrors,
//     brands: state.brand.brandsSelect,
//   };
// };
export default Add;
