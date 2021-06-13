import React, { useState, useEffect } from "react";
import { Icon, Pagination, Grid, Image, Form, Button, Input, Header, Modal, Dropdown, Label } from "semantic-ui-react";
import { Paths } from "../routes/routePaths";
import { withRouter } from "react-router";
import '../../App.scss'
import { RMIUploader } from "react-multiple-image-uploader";
import './product.scss'
import { CategoryServices } from "../../Services/CategoryServices";
import Tags from "@yaireo/tagify/dist/react.tagify" // React-wrapper file
import "@yaireo/tagify/dist/tagify.css" // Tagify CSS
import { ProductServices } from "../../Services/ProductServices";
import { toast } from "react-toastify";
import ImageDropzone from "./ImageDropzone";
import { uploadFile } from "react-s3";

let categoryServices = new CategoryServices
let productServices = new ProductServices

function ProductForm(props) {
  const [activePage, setActivePage] = useState("1");
  const [search, setSearch] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [productName, setProductName] = React.useState("");
  const [visible, setVisible] = useState(false);
  const [dataSources, setDataSources] = useState([]);
  const [description, setDescription] = React.useState("");
  const [productSize, setProductSize] = React.useState("");
  const [productColor, setProductColor] = React.useState([]);
  const [productPrice, setProductPrice] = React.useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [productId, setProductId] = React.useState(false);

  const [productVideo, setProductVideo] = React.useState("");
  const [productCategoryId, setProductCategoryId] = React.useState("");

  const [productImage, setProductImage] = React.useState([]);
  const [imageData, setImageData] = React.useState([]);




  useEffect(() => {
    if (props.location.pathname && props.location.pathname.split("/").length > 3 && props.location.pathname.split("/")[3]) {
      setProductId(props.location.pathname.split("/")[3])
      getDetailProduct(props.location.pathname.split("/")[3])
    }

    getAllCategory("all")
  }, []);

  const handleColorInputChange = (e) => {
    var temp = productColor;
    temp.push({ value: e.target.value })
    setProductColor([...temp])
  }

  const getDetailProduct = (activePage) => {
    productServices.getDetailProduct(activePage).then(
      (data) => {
        debugger
        var tempArr = JSON.parse(data.data.image)
        setDescription(data.data.description)
        setProductCategoryId(data.data.category_id)
        setProductColor([...JSON.parse(data.data.color)])
        setProductName(data.data.name)
        setProductSize(data.data.size)
        setProductVideo(data.data.video)
        setProductPrice(data.data.price)
        setProductImage([...tempArr])
      },
      (error) => {
        console.log("error.response.status", error);
      }
    );
  };

  const getAllCategory = (activePage) => {
    productServices.getAllCategoryWithSubCategory(activePage).then(
      (data) => {
        var tempArr = []
        if (data.data.data.data.length > 0) {
          data.data.data.data.map((item) => {
            tempArr.push({
              key: item.id,
              value: item.id,
              text: item.name
            })
          })
          setCategoryList([...tempArr])
        }

      },
      (error) => {
        console.log("error.response.status", error);
      }
    );
  };
  const handleSetVisible = () => {
    setVisible(true);
  };
  const hideModal = () => {
    setVisible(false);
  };
  const onUpload = (data) => {
    var tempArr = []
    if (data.length) {
      data.map((item, i) => {
        tempArr.push({
          id: i + 1,
          dataURL: item.dataURL
        })
      })
      setDataSources([...tempArr])
    }
    console.log("Upload files", data);
  };
  const onSelect = (data) => {
    console.log("Select files", data);
  };
  const onRemove = (id) => {
    console.log("Remove image id", id);
    if (dataSources.length) {
      dataSources.map((item, i) => {
        if (item.id === id) {
          dataSources.splice(i, 1)
        }
      })
      setDataSources([...dataSources])
    }
  };

  const handleAddProduct = () => {
    var data = {
      name: productName,
      description: description,
      price: productPrice,
      category_id: productCategoryId,
      image: productImage,
      video: productVideo,
      size: productSize,
      color: productColor
    }
    productServices.createProduct(data, productId).then(
      (data) => {
        toast.success("Product added successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setDisableSubmit(false)
        props.history.push("/product")
      },
      (error) => {
        setDisableSubmit(false);
        toast.error(error.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        console.log("error.response.status", error);
      }
    );
  }

  function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  // const onImageUpload = () => {
  //   const config = {
  //     bucketName: "gifting-tree",
  //     dirName: "img" /* optional */,
  //     region: "ap-south-1",
  //     accessKeyId: "AKIAXIHDO3JANDGTMCHB",
  //     secretAccessKey: "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",
  //   };
  //   // const file = event.target.files[0];
  //   var tempUrlArr = [];
  //   imageData.map((x) => {
  //     var filename = parseInt(Math.random() * 10000000) + "-gifting-tree-product.png";
  //     var file = dataURLtoFile(x.preview, filename);
  //     uploadFile(file, config)
  //       .then((data) => {
  //           tempUrlArr.push(data.location.replace(/ /g, "%20"));
  //       })
  //       .catch((err) => console.error(err));
  //   })
  //   return tempUrlArr;
  // };


  return (
    <div className="main-contant">
      <Header as="h2" className="heading-page">
        Create Products
      		</Header>
      <div className="product-form">
        <Form>
          <Grid>
            <Grid.Row>
              <Grid.Column width={8}>
                <div className="multi-image-upload-product">
                  <ImageDropzone setImageData={setImageData} productImage={productImage} productImage={productImage} />
                  {/* <RMIUploader
                                isOpen={visible}
                                hideModal={hideModal}
                                onSelect={onSelect}
                                onUpload={onUpload}
                                onRemove={onRemove}
                                dataSources={dataSources}
                                
                              /> */}
                </div>

              </Grid.Column>
              <Grid.Column width={8}>

                <Form.Input
                  fluid
                  label="Product Name"
                  placeholder="Product Name"
                  value={productName}
                  name="productName"
                  onChange={(e) => setProductName(e.target.value)}
                />
                <Form.Input
                  fluid
                  type="text"
                  label="Price"
                  placeholder="Price"
                  value={productPrice}
                  name="productPrice"
                  onChange={(e) => setProductPrice(e.target.value)}
                />

                <Form.Input
                  fluid
                  type="text"
                  label="Video"
                  placeholder="Video"
                  value={productVideo}
                  name="productVideo"
                  onChange={(e) => setProductVideo(e.target.value)}
                />
                <label className="label-category">Size</label>

                <Tags
                  placeholder="Size"
                  value={productSize}
                  className="tag-product-size-color"
                  onChange={(e) => setProductSize(JSON.parse(e.detail.value))}
                />

                <label className="label-category">Color</label>
                <Grid>
                  <Grid.Row>
                    <Grid.Column width={1}>
                      <div>
                        <input onChange={handleColorInputChange} style={{ marginTop: 7, height: 20, width: 20 }} type="color" />
                      </div>
                    </Grid.Column>
                    <Grid.Column style={{ paddingLeft: 5 }} width={15}>
                      <Tags
                        placeholder="Color"
                        value={productColor}
                        name="productColor"
                        className="tag-product-size-color"
                        onChange={(e) => setProductColor(JSON.parse(e.detail.value))}
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>

                <label className="label-category">Select Category</label>
                <Dropdown
                  placeholder='Select Category'
                  fluid
                  search
                  value={productCategoryId}
                  selection
                  options={categoryList}
                  onChange={(e, { value }) => setProductCategoryId(value)}
                />
                <Form.TextArea
                  label="Description"
                  value={description}
                  className="textarea-product"
                  placeholder="Type here"
                  style={{ marginTop: 5 }}
                  onChange={(event) => setDescription(event.target.value)}
                />
                <div className="form-div-btn">
                  <Button className="form-primary-cancle-btn" onClick={() => window.history.back()}>Cancle</Button>
                  <Button className="form-primary-add-btn" disabled={disableSubmit} onClick={handleAddProduct}>Save</Button>

                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>

        </Form>
      </div>
    </div>
  );
}

export default withRouter(ProductForm);
