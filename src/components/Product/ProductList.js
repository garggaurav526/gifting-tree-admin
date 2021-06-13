import React, { useState, useEffect } from "react";
import { Icon, Table, Pagination, Grid, Image, Form, Button, Input, Header, Modal, Dropdown } from "semantic-ui-react";
import { Paths } from "../routes/routePaths";
import { withRouter } from "react-router";
import '../../App.scss'
import { ProductServices } from "../../Services/ProductServices";
import { toast } from "react-toastify";


let productServices = new ProductServices


function ProductList(props) {
	const [activePage, setActivePage] = useState("1");
    const [search, setSearch] = React.useState("");
    const [paginationDetail, setPaginationDetail] = useState("");
    const [deleteProduct, setDeleteProduct] = React.useState(false);
    const [productId, setProductId] = React.useState(false);
    const [disableSubmit, setDisableSubmit] = useState(false);

	const [productList, setProductList] = useState([]);

    
	useEffect(() => {
        getAllProductList()
	}, []);
    const getAllProductList = (activePage) => {
        productServices.getAllProductList(activePage).then(
          (data) => {
            setPaginationDetail(data.data.data);
            setProductList(data.data.data.data);
            
          },
          (error) => {
            console.log("error.response.status", error);
          }
        );
      };

      const handleDeleteProduct = ()=>{
        productServices.deleteProduct(productId).then(
            (data) => {
                toast.success("Product deleted", {
                    position: toast.POSITION.TOP_RIGHT,
                  });
                  setDeleteProduct(false)
                  getAllProductList(activePage)
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

      const handleEdit = (id) => {
       props.history.push(`/product/edit/${id}`)

    }
    const handleDelete = (id) => {
        setProductId(id)
        setDeleteProduct(true)
        // getDetailCategory(id)
    }

    const handleAddWating=(id)=>{
      debugger
    }
    
	return (
		<div className="main-contant">
			<Header as="h2" className="heading-page">
				Products
      		</Header>
              <div>
                  <Grid>
                      <Grid.Row>
                          <Grid.Column width={13}>
                          <div className="search-box" >
                <Input 
                    icon='search' 
                    className="input-search"
                    iconPosition='left'
                    name="search"
                    value={search}
                    placeholder='Search Product' 
                    // onChange={handleSearch} 
                />
            </div>
                          </Grid.Column>
                          <Grid.Column width={3}>
                              <Button className="primary-add-btn" onClick={() =>props.history.push("/product/create")}>Add Product</Button>
                          </Grid.Column>
                      </Grid.Row>
                  </Grid>
                  <div className="table-custom">

                
              <Table basic>
									<Table.Header>
										<Table.Row>
											<Table.HeaderCell>S.No</Table.HeaderCell>
											<Table.HeaderCell>Image</Table.HeaderCell>
                                            <Table.HeaderCell>Name</Table.HeaderCell>
                                            <Table.HeaderCell>Price</Table.HeaderCell>
											<Table.HeaderCell textAlign="center">Action</Table.HeaderCell>
										</Table.Row>
									</Table.Header>
                    {productList.map((item,i) => (
                        <Table.Row>
														<Table.Cell> {i+1} 
                            </Table.Cell>
                            <Table.Cell>
                                <Image src={
                                    JSON.parse(item.image).length>0 && JSON.parse(item.image)[0]
                                    } width="30" height="30" />
                            </Table.Cell>
														<Table.Cell>{item.name}</Table.Cell>
                                                        <Table.Cell>{item.price}</Table.Cell>
                            <Table.Cell textAlign="center">
														
															<Icon name='edit' 
																style={{color: "#28a745"}} 
                                                                onClick={()=> handleEdit(item.id)} 
															/>
															<Icon name='trash alternate' 
                                style={{color: "#dc3545"}} 
                                onClick={()=> handleDelete(item.id)}
															/>
                              <Icon name='plus' 
                                style={{color: "#2d3e50"}} 
                                onClick={()=> handleAddWating(item.id)}
															/>
														</Table.Cell>
                      </Table.Row>
                    ))}
									<Table.Footer>
									<Table.Row>
										<Table.HeaderCell colSpan='7'>
										<div className= "pagination">
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
          open={deleteProduct}
          onClose={() => setDeleteProduct(false)}
          size="tiny"
          className="modal-open-create"
        >
          <Modal.Content className="content-center">
                <Header as="h3"  textAlign="center" style={{marginBottom: 60, fontSize: 30}}>
                Are you sure, you want to delete
                        </Header>
              <div className="btn-parent-div">
                <Button
                  type="submit"
                  className="cancle-btn-modal"
                  
                  onClick={() => setDeleteProduct(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="create-btn-modal"
                  
                  onClick={handleDeleteProduct}
                //   disabled={disableSubmit}
                >
                  Delete
                </Button>
              </div>     
          </Modal.Content>
        </Modal>
      </>
		</div>
	);
}

export default withRouter(ProductList);
