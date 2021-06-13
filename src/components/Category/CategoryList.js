import React, { useState, useEffect } from "react";
import { Icon, Table, Pagination, Grid, Card, Form, Button, Input, Header, Modal, Dropdown, Image } from "semantic-ui-react";
import { Paths } from "../routes/routePaths";
import { withRouter } from "react-router";
import '../../App.scss'
import './category.scss'
import { CategoryServices } from "../../Services/CategoryServices";
import { toast } from "react-toastify";
import { uploadFile } from "react-s3";

let categoryServices = new CategoryServices
  ();

function CategoryList(props) {
  const [activePage, setActivePage] = useState("1");
  const [activeSubPage, setActiveSubPage] = useState("1");
  const [search, setSearch] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [openSub, setOpenSub] = React.useState(false);
  const [subCategoriesModal, setSubCategoriesModal] = React.useState(false);
  const [categoryName, setCategoryName] = React.useState("");
  const [categoryImage, setCategoryImage] = React.useState([]);
  const [categoryDesc, setCategoryDesc] = React.useState("");
  const [categoryParent, setCategoryParent] = React.useState(0);
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [paginationDetail, setPaginationDetail] = useState("");
  const [subPaginationDetail, setSubPaginationDetail] = useState("");
  const [deleteCategory, setDeleteCategory] = React.useState(false);
  const [categoryId, setCategoryId] = React.useState(false);
  const [categoriesOptions, setCategoriesOptions] = React.useState([]);
  const [subCategoryList, setSubCategoriesList] = React.useState([]);
  const [parentName, setParentName] = React.useState("");

  const [categoryList, setCategoryList] = useState([]);

  const handleClickAddCategory = () => {
    setOpen(true)
    setCategoryName("")
    setCategoryId("")
    setCategoryDesc("")
    setCategoryImage("")
    setCategoryParent(0)
  }

  const handleClickAddSubCategory = () => {
    setOpenSub(true)
    setCategoryName("")
    setCategoryId("")
    setCategoryParent(0)
    setCategoryDesc("")
    setCategoryImage("")
  }


  useEffect(() => {
    getAllCategoryList(activePage)
    getAllCategories("all")
  }, []);

  const getAllCategoryList = (activePage) => {
    categoryServices.getAllCategoryList(activePage).then(
      (data) => {
        setPaginationDetail(data.data.data);
        setCategoryList(data.data.data.data);

      },
      (error) => {
        console.log("error.response.status", error);
      }
    );
  };

  const getAllCategories = (activePage) => {
    categoryServices.getAllCategoryList(activePage).then(
      (data) => {
        var tempArr = [];
        data && data.data && data.data.data.map((x, i) => {
          tempArr.push({
            key: i,
            value: x.id,
            text: x.name
          })
        })
        setCategoriesOptions(tempArr);

      },
      (error) => {
        console.log("error.response.status", error);
      }
    );
  };

  const handleParentChange = (e, data) => {
    setCategoryParent(data.value);
  }

  const handleCreateCategory = () => {
    if (categoryName) {
      var data = {
        name: categoryName,
        image: categoryImage,
        description: categoryDesc,
        is_parent: categoryParent
      }
      setDisableSubmit(false);
      categoryServices.createCategory(data, categoryId).then(
        (data) => {
          toast.success("Category added successfully", {
            position: toast.POSITION.TOP_RIGHT,
          });
          setOpen(false)
          setCategoryId("")
          setOpenSub(false)
          if(categoryParent !== 0){
            viewSubCategory(categoryParent, parentName)
          }
          getAllCategoryList(activePage)
          setCategoryParent(0)
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
  }

  const viewSubCategory = (id,Pname) => {
    setParentName(Pname)
    categoryServices.getSubCategoryList(id,activeSubPage).then(
      (data) => {
        setSubPaginationDetail(data.data.data);
        setSubCategoriesList(data.data.data.data);
        setSubCategoriesModal(true);
      },
      (error) => {
        console.log("error.response.status", error);
      }
    );
  }

  const handleDelete = (val, type) => {
    setCategoryId(val.id)
    if(type === "sub"){
      setCategoryParent(val.is_parent)
    }
    setDeleteCategory(true)
  }
  const getDetailCategory = (id) => {
    categoryServices.getDetailCategory(id).then(
      (data) => {
        setCategoryName(data.data.name)
        setCategoryParent(data.data.is_parent)
        setCategoryDesc(data.data.description)

      },
      (error) => {
        console.log("error.response.status", error);
      }
    );
  }

  const handleDeleteCategory = () => {
    setDisableSubmit(true);
    categoryServices.deleteCategory(categoryId).then(
      (data) => {
        toast.success("Category deleted", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setDisableSubmit(false);
        setDeleteCategory(false)
        if(categoryParent !== 0){
          viewSubCategory(categoryParent, parentName)
        }        
        getAllCategoryList(activePage)
        setCategoryParent(0)
      },
      (error) => {
        setDisableSubmit(false);
        toast.error(error.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        console.log("error.response.status", error);
      }
    )
  }

  const handleEdit = (id, type) => {
    setCategoryId(id)
    if(type === "sub"){
      setOpenSub(true)
    }else{
      setOpen(true)
    }
    getDetailCategory(id)

  }

  const onImageUpload = (event) => {
    const config = {
      bucketName: "gifting-tree",
      dirName: "img" /* optional */,
      region: "ap-south-1",
      accessKeyId: "AKIAXIHDO3JANDGTMCHB",
      secretAccessKey: "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",
    };
    const file = event.target.files[0];
    uploadFile(file, config)
      .then((data) => {
        debugger
        setCategoryImage(data.location.replace(/ /g, "%20"));
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="main-contant">
      <Header as="h2" className="heading-page">
        Categories
      		</Header>
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>
              <div className="search-box" >
                <Input
                  icon='search'
                  className="input-search"
                  iconPosition='left'
                  name="search"
                  value={search}
                  placeholder='Search Category'
                // onChange={handleSearch} 
                />
              </div>
            </Grid.Column>
            <Grid.Column width={3}>
              <Button className="primary-add-btn" onClick={handleClickAddCategory}>Add Category</Button>
            </Grid.Column>
            <Grid.Column width={3}>
              <Button className="primary-add-btn" onClick={handleClickAddSubCategory}>Add Sub Category</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <div className="table-custom">
          <Table basic>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>S.No</Table.HeaderCell>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Image</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">Action</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            {categoryList.map((item, i) => (
              <Table.Row>
                <Table.Cell> {i + 1}
                </Table.Cell>
                <Table.Cell>{item.name}</Table.Cell>
                <Table.Cell><Image src={item.image} width="40" height= "40" /></Table.Cell>
                <Table.Cell textAlign="center">

                  <Icon name='edit'
                    onClick={() => handleEdit(item.id, "parent")}
                    style={{ color: "#28a745" }}
                  />
                  <Icon name='trash alternate'
                    style={{ color: "#dc3545" }}
                    onClick={() => handleDelete(item, "parent")}
                  />
                  <Icon name='eye'
                    style={{ color: "blue" }}
                    onClick={() => viewSubCategory(item.id,item.name)}
                  />
                </Table.Cell>
              </Table.Row>
            ))}
            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell colSpan='7'>
                  <div className="pagination">
                    <Pagination
                      defaultActivePage={1}
                    // totalPages={paginationDetail && paginationDetail.total_pages}
                    // onPageChange={handlePage}
                    />
                  </div>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>
        </div>
      </div>
      <>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          size="tiny"
          className="modal-open-create"
        >
          <Modal.Content className="content-center">
            <Header as="h3" style={{ margin: 0 }}>
              Add New Category
                        </Header>
            <div >
            </div>
            <div style={{ paddingTop: 35 }}>
              <Form>

                <Form.Input
                  fluid
                  label="Category Name"
                  placeholder="Category Name"
                  value={categoryName}
                  name="categoryName"
                  onChange={(e) => setCategoryName(e.target.value)}
                />
                <Form.Input
                  fluid
                  label="Category Description"
                  placeholder="Category Description(Optional)"
                  value={categoryDesc}
                  name="categoryName"
                  onChange={(e) => setCategoryDesc(e.target.value)}
                />
                {/* <Form.Input
                  fluid
                  label="Category Image"
                  placeholder="Category Image"
                  value={categoryImage}
                  name="categoryName"
                  onChange={(e) => setCategoryImage(e.target.value)}
                /> */}
                <div style={{
                  borderRadius: "4px",
                  border: "1px solid #dededf",
                  height: "42px",
                  marginLeft: "7px",
                  padding: "10px",
                }}><label style={{ color: "#000" }} for="file-input">Choose File</label>
                  <span style={{ marginLeft: 20 }}>{categoryImage != "" && categoryImage.split("/")[categoryImage.split("/").length - 1]}</span>
                  <Form.Input
                    id="file-input"
                    type="file"
                    name="profile"
                    className="form-control"
                    style={{ display: 'none' }}
                    // accept="image/jpeg,image/jpg"
                    onChange={($event) => {
                      onImageUpload($event);
                    }}
                  /></div>


              </Form>
            </div>
            <div className="btn-parent-div">
              <Button className="cancle-btn-modal" onClick={() => setOpen(false)}>Cancel</Button>
              <Button className="create-btn-modal" disabled={disableSubmit} onClick={handleCreateCategory}>Save</Button>

            </div>
          </Modal.Content>

        </Modal>

      </>
      <>
        <Modal
          open={openSub}
          onClose={() => setOpenSub(false)}
          size="tiny"
          className="modal-open-create"
        >
          <Modal.Content className="content-center">
            <Header as="h3" style={{ margin: 0 }}>
              {categoryId ? "Edit" : "Add"} Sub Category
                        </Header>
            <div >
            </div>
            <div style={{ paddingTop: 35 }}>
              <Form>
                <label style={{ fontWeight: 'bold' }}>Select Parent Category</label>
                <Dropdown
                  placeholder='Categories'
                  fluid
                  search
                  selection
                  style={{ marginBottom: 10 }}
                  options={categoriesOptions}
                  value={categoryParent}
                  onChange={handleParentChange}
                />
                {categoryParent !== 0 && <>
                  <Form.Input
                    fluid
                    label="Category Name"
                    placeholder="Category Name"
                    value={categoryName}
                    name="categoryName"
                    onChange={(e) => setCategoryName(e.target.value)}
                  />
                  <Form.Input
                    fluid
                    label="Category Description"
                    placeholder="Category Description(Optional)"
                    value={categoryDesc}
                    name="categoryName"
                    onChange={(e) => setCategoryDesc(e.target.value)}
                  />
                  {/* <Form.Input
                    fluid
                    label="Category Image"
                    placeholder="Category Image"
                    value={categoryImage}
                    name="categoryName"
                    onChange={(e) => setCategoryImage(e.target.value)}
                  /> */}
                  <div style={{
                  borderRadius: "4px",
                  border: "1px solid #dededf",
                  height: "42px",
                  marginLeft: "7px",
                  padding: "10px",
                }}><label style={{ color: "#000" }} for="file-input">Choose File</label>
                  <span style={{ marginLeft: 20 }}>{categoryImage != "" && categoryImage.split("/")[categoryImage.split("/").length - 1]}</span>
                  <Form.Input
                    id="file-input"
                    type="file"
                    name="profile"
                    className="form-control"
                    style={{ display: 'none' }}
                    // accept="image/jpeg,image/jpg"
                    onChange={($event) => {
                      onImageUpload($event);
                    }}
                  /></div>
                </>
                }


              </Form>
            </div>
            <div className="btn-parent-div">
              <Button className="cancle-btn-modal" onClick={() => setOpenSub(false)}>Cancel</Button>
              <Button className="create-btn-modal" disabled={disableSubmit} onClick={handleCreateCategory}>Save</Button>

            </div>
          </Modal.Content>

        </Modal>

      </>
      <>
        <Modal
          open={deleteCategory}
          onClose={() => setDeleteCategory(false)}
          size="tiny"
          className="modal-open-create"
        >
          <Modal.Content className="content-center">
            <Header as="h3" textAlign="center" style={{ marginBottom: 60, fontSize: 30 }}>
              Are you sure, you want to delete
                        </Header>
            <div className="btn-parent-div">
              <Button
                type="submit"
                className="cancle-btn-modal"

                onClick={() => setDeleteCategory(false)}
              >
                Cancel
                </Button>
              <Button
                type="submit"
                className="create-btn-modal"

                onClick={handleDeleteCategory}
                disabled={disableSubmit}
              >
                Delete
                </Button>
            </div>
          </Modal.Content>
        </Modal>
      </>
      <>
        <Modal
          open={subCategoriesModal}
          onClose={() => setSubCategoriesModal(false)}
          size="small"
          className="modal-open-create"
        >
          <Modal.Content className="content-center">
            <Header as="h3" textAlign="center" style={{ marginBottom: 60, fontSize: 30 }}>
              Sub Categories for <span style={{color:'blue'}}>{parentName}</span> 
                        </Header>
            <div className="table-custom">
              <Table basic>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>S.No</Table.HeaderCell>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Image</Table.HeaderCell>
                    <Table.HeaderCell textAlign="center">Action</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                {subCategoryList.map((item, i) => (
                  <Table.Row>
                    <Table.Cell> {i + 1}
                    </Table.Cell>
                    <Table.Cell>{item.name}</Table.Cell>
                    <Table.Cell><Image src={item.image} width="40" height= "40" /></Table.Cell>
                    <Table.Cell textAlign="center">

                      <Icon name='edit'
                        onClick={() => handleEdit(item.id, "sub")}
                        style={{ color: "#28a745" }}
                      />
                      <Icon name='trash alternate'
                        style={{ color: "#dc3545" }}
                        onClick={() => handleDelete(item, "sub")}
                      />
                    </Table.Cell>
                  </Table.Row>
                ))}
                <Table.Footer>
                  <Table.Row>
                    <Table.HeaderCell colSpan='7'>
                      <div className="pagination">
                        <Pagination
                          defaultActivePage={1}
                        // totalPages={paginationDetail && paginationDetail.total_pages}
                        // onPageChange={handlePage}
                        />
                      </div>
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Footer>
              </Table>
            </div>
          </Modal.Content>
      </Modal>
      </>
    </div >
  );
}

export default withRouter(CategoryList);
