import React, { useState, useEffect } from "react";
import { Icon, Table, Pagination, Radio, Grid, Card, Image, Button, Input, Header, Modal, Dropdown } from "semantic-ui-react";
import { Paths } from "../routes/routePaths";
import { withRouter } from "react-router";
import '../../App.scss'
import './dashboard.scss'
function Dashboard(props) {
	const [activePage, setActivePage] = useState("1");



	useEffect(() => {
	}, []);



	return (
		<div className="main-contant">
			<Header as="h2" className="heading-page">
				Dashboard
      		</Header>
			<div className="dashboard-card-box">
				<Card.Group>
					<Card>
						<Card.Content>
							<Card.Header>1000</Card.Header>
							<div className="icon-box">
								<div className="icon-custom">
									<Icon name= "users" />
								</div>
							</div>
							<Card.Meta>User</Card.Meta>
							{/* <Card.Description>
								No. of User
        					</Card.Description> */}
						</Card.Content>
					</Card>
				</Card.Group>
			</div>
		</div>
	);
}

export default withRouter(Dashboard);
