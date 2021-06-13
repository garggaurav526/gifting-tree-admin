import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
// import Dashboard from "../Dashboard/Dashboard";
import Login from "../Login/Login";
import { Paths } from "./routePaths";
import PrivateRoute from "./PrivateRoute";
import { ToastContainer } from "react-toastify";
import Dashboard from "../Dashboard/Dashboard";
import CategoryList from "../Category/CategoryList";
import ProductList from "../Product/ProductList";
import ProductForm from "../Product/ProductForm";
import OrderList from "../Order/OrderList";
function Routes() {
  return (
    <Router>
      <ToastContainer />
      <Switch>
        <Route exact path={Paths.LogIn} component={Login} />
        <PrivateRoute exact path={Paths.Dashboard} component={Dashboard} />
        <PrivateRoute exact path={Paths.Category} component={CategoryList} />
        <PrivateRoute exact path={Paths.Product} component={ProductList} />
        <PrivateRoute exact path={Paths.ProductCreate} component={ProductForm} />
        <PrivateRoute exact path={Paths.ProductEdit} component={ProductForm} />
        <PrivateRoute exact path={Paths.Order} component={OrderList} />

        <Redirect to={Paths.Dashboard} /> 
      </Switch>
    </Router>
  );
}
export default Routes;
