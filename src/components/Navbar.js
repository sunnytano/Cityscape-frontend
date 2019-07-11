import React from 'react'
import { Grid, Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'


class Navbar extends React.Component {
	//<i class="fas fa-hotel"></i>
	render() {
		return (
			<Grid.Row>
				<Grid.Column width={16}>
					<Menu className="">
						<Link className="nav-bar" 
						style={{fontFamily: 'Rock Salt'}}
						onClick={this.props.show} 
						className="item" to="/">
							Cityscape
						</Link>
						{this.props.currentUser ?
							<Menu.Menu position="right">
								<h2 style={{fontFamily: 'Gothic A1'}}>Welcome, {this.props.currentUser.first_name}! </h2> 
								<Link 
								style={{fontFamily: 'Rock Salt'}}
								className="item" to={`/new_listings/${this.props.currentUser.id}`}>
									Host
								</Link>
								<Link 
								style={{fontFamily: 'Rock Salt'}}
								className="item" to={`/users/${this.props.currentUser.id}`}>
									Account
								</Link>
								<Menu.Item 
								style={{fontFamily: 'Rock Salt'}}
								onClick={this.props.logOut}>
									Logout
								</Menu.Item>
							</Menu.Menu>
							:
							<Menu.Menu position="right">
								<Link 
								style={{fontFamily: 'Rock Salt'}}
								className="item" to="/login">
									Login
								</Link>
								<Link 
								style={{fontFamily: 'Rock Salt'}}
								className="item" to="/signup">
									Sign Up
								</Link>
							</Menu.Menu>
						}
					</Menu>
				</Grid.Column>
			</Grid.Row>
		)
	}
}

export default Navbar