import React, { useState, useEffect } from "react";
import {
  Grid,
  Dropdown,
  Image,
  Search,
  Button,
  Header,
  Modal,
  Popup,
  Icon,
} from "semantic-ui-react";

import "./MainFrame.scss";
import { useHistory, withRouter } from "react-router";
import { Link } from "react-router-dom";


function HeaderPage(props) {
  const [profileDetail, setProfileDetail] = useState("");
  const [notificationList, setNotificationList] = useState([]);
  const [adminDetail, setAdminDetail] = useState([]);
  const [companyName, setCompanyName] = useState(false);


  const history = useHistory();
  const handleLogOut = () => {
    // this.props.history.push("/")
    localStorage.clear();

    window.location.reload();
  };
  useEffect(() => {

  }, []);

  return (
    <React.Fragment>
      <Grid>
        <Grid.Row 
        className="header-page"
        >
          <Grid.Column width={15}>
            {/* <Image
              src={logoPMS}
              className="image-header"
              onClick={handleLogoClick}
              width="120"
            /> */}
            <Header as="h3" className="color-primary EBHeading">
              Gifting tree
            </Header>
          </Grid.Column>
          <Grid.Column width={1}>
            <div
              // className="header-dropdown"
              // style={{ marginTop: 8, display: "flex", marginRight: "2rem" }}
            >
             
              <Dropdown
                pointing="top right"
                icon="user"
                style={{float: "right"}}
                // text="Shaik Vaseem"
                // icon="user outline"
                // floating
                // labeled
                // iconPosition='left'
                // className="icon"
                style={{ marginTop: 0 }}
              >
                {/* <span>Shaik Vaseem</span> */}
                <Dropdown.Menu>
                  <Dropdown.Item
                    // icon="user"
                    inline
                    text="&nbsp;&nbsp;Profile"
                    onClick={() => history.push("/profile")}
                  />

                  <Dropdown.Item
                    // icon="setting"
                    inline
                    text="Setting"
                    onClick={() => history.push("/setting")}
                  />
                  <Dropdown.Item
                    // icon="log out"
                    inline
                    text="LogOut"
                    onClick={() => handleLogOut()}
                  />
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>

      
    </React.Fragment>
  );
}

export default withRouter(HeaderPage);
