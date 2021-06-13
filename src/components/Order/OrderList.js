import React, { useState, useEffect } from "react";
import { Icon, Table, Pagination, Grid, Card, Form, Button, Input, Header, Modal, Dropdown } from "semantic-ui-react";
import { Paths } from "../routes/routePaths";
import { withRouter } from "react-router";
import '../../App.scss'
import { toast } from "react-toastify";
import { OrderServices } from "../../Services/OrderServices";

let orderServices = new OrderServices
();

function OrderList(props) {
	const [activePage, setActivePage] = useState("1");
    const [search, setSearch] = React.useState("");
    const [open, setOpen] = React.useState(false);
    const [categoryName, setCategoryName] = React.useState("");
    const [disableSubmit, setDisableSubmit] = useState(false);
    const [paginationDetail, setPaginationDetail] = useState("");
    const [deleteCategory, setDeleteCategory] = React.useState(false);
    const [categoryId, setCategoryId] = React.useState(false);

	const [orderList, setOrderList] = useState([]);

    const handleClickAddCategory = () => {
        setOpen(true)
        setCategoryName("")
        setCategoryId("")
    }

    
	useEffect(() => {
        getAllOrderList(activePage)
	}, []);

    const getAllOrderList = (activePage) => {
        orderServices.getAllOrderList(activePage).then(
          (data) => {
              debugger
            setPaginationDetail(data.data.data);
            setOrderList(data.data.data.data);
            
          },
          (error) => {
            console.log("error.response.status", error);
          }
        );
      };

     

      const handleDelete =(id) => {
          setCategoryId(id)
          setDeleteCategory(true)
      }
      const getDetailCategory = (id) =>{
        // orderServices.getDetailCategory(id).then(
        //     (data) => {
        //       setCategoryName(data.data.name)
              
        //     },
        //     (error) => {
        //       console.log("error.response.status", error);
        //     }
        //   );
      }

      const handleDeleteCategory = ()=>{
        // orderServices.deleteCategory(categoryId).then(
        //     (data) => {
        //         toast.success("Category deleted", {
        //             position: toast.POSITION.TOP_RIGHT,
        //           });
        //           setDeleteCategory(false)
        //           getAllOrderList(activePage)
        //     },
        //     (error) => {
        //         setDisableSubmit(false);
        //         toast.error(error.message, {
        //             position: toast.POSITION.TOP_RIGHT,
        //           });
        //       console.log("error.response.status", error);
        //     }
        //   )
      }

      const handleEdit = (id) => {
          setCategoryId(id)
          setOpen(true)
          getDetailCategory(id)

      }
    
	return (
		<div className="main-contant">
			<Header as="h2" className="heading-page">
				Orders
      		</Header>
              <div>
                  {/* <Grid>
                      <Grid.Row>
                          <Grid.Column width={13}>
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
                      </Grid.Row>
                  </Grid> */}
                  <div className="table-custom">

                
              <Table basic>
									<Table.Header>
										<Table.Row>
											<Table.HeaderCell>S.No</Table.HeaderCell>
											<Table.HeaderCell>Name</Table.HeaderCell>
											<Table.HeaderCell textAlign="center">Action</Table.HeaderCell>
										</Table.Row>
									</Table.Header>
                    {orderList.map((item,i) => (
                        <Table.Row>
														<Table.Cell> {i+1} 
                            </Table.Cell>
														<Table.Cell>{item.name}</Table.Cell>
                            <Table.Cell textAlign="center">
														
															<Icon name='edit' 
                                                            onClick={() => handleEdit(item.id)}
																style={{color: "#28a745"}}  
															/>
															<Icon name='trash alternate' 
                                style={{color: "#dc3545"}} 
                                onClick={() => handleDelete(item.id)}
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
          open={deleteCategory}
          onClose={() => setDeleteCategory(false)}
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
                  
                  onClick={() => setDeleteCategory(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="create-btn-modal"
                  
                  onClick={handleDeleteCategory}
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

export default withRouter(OrderList);
