import React, { useState } from 'react';
import {
    Grid,
    Menu,
    Image, Icon, Header
} from 'semantic-ui-react';
import './MainFrame.scss'
import {Link} from 'react-router-dom';
import { Paths } from "../routes/routePaths";


export default function SidebarPage(props) {

    const [activeItem, setActiveItem] = useState(localStorage.getItem("isActiveItem") ? localStorage.getItem("isActiveItem") : "dashboard")
    const [isHovered,setIsHovered] = useState(false);
    const [isOpenGoal,setIsOpenGoal] = useState(false);
    const [isOpenTeam,setIsOpenTeam] = useState(false);
    const [activeSubItem,setActiveSubItem] = useState(false);

   const  handleItemClick = (e, { name }) => setActiveItem( name )

    return (
        <React.Fragment>
            <Grid>
                <Grid.Row className="body-content">
                    <div className="sidebar-tag">

                        <Grid.Column>
                            <Header as="h3" className="logo-text">
                                Gifting <span>Tree</span>
                            </Header>
                            <Menu secondary vertical>
                                <Menu.Item
                                name='home'
                                active={activeItem === 'home'}
                                onClick={handleItemClick}
                                as={Link}
                                to="/dashboard"
                                />
                                <Menu.Item
                                name='category'
                                active={activeItem === 'category'}
                                onClick={handleItemClick}
                                as={Link}
                                to="/category"
                                />
                                <Menu.Item
                                name='product'
                                active={activeItem === 'product'}
                                onClick={handleItemClick}
                                as={Link}
                                to="/product"
                                />
                                <Menu.Item
                                name='order'
                                active={activeItem === 'order'}
                                onClick={handleItemClick}
                                as={Link}
                                to="/orders"
                                />
                                <Menu.Item
                                name='wating product'
                                active={activeItem === 'wating product'}
                                onClick={handleItemClick}
                                as={Link}
                                to="/wating-product"
                                />
                            </Menu>
                            
                        </Grid.Column>
                    </div>
                   
                </Grid.Row>
                
            </Grid>
        </React.Fragment>
    )
}

