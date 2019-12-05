import React from 'react';
import './App.css';
import Login from './components/Login'
import { Switch, Route } from 'react-router-dom'
import { Grid } from 'semantic-ui-react'
import Signup from './components/Signup.js'
import Navbar from './components/Navbar'
import Profile from './components/Profile'
import AddListing from './components/AddListing'
import Home from './containers/Home'
import ListingContainer from './containers/ListingContainer'

class App extends React.Component {

	state = {
		currentUser: null,
		search: "",
		toggle: false,
		loggedin: false,
		token: "",
		show: false,
		listings: [],
		allListings: [],
		selectedListing: [],
		bookings: [],
		booking: [],
		neighborhood: "",
		borough: "",
		description: "",
		min_night: "",
		price: "",
		loading: true
	}

	handleAddNew = (newListing) => {
		this.setState({
			currentUser: { ...this.state.currentUser, listings: [...this.state.currentUser.listings, newListing] }
		}, () => console.log(this.state.currentUser))
	}

	handleRemoveList = (remListing) => {
		const newListing = this.state.currentUser.listings.filter(listing => listing.id !== remListing)
		let update = { ...this.state.currentUser, listings: newListing }
		if (window.confirm("Delete?")) {
			this.setState({
				currentUser: update
			}
			)
		}
	}

	// handleRemove = (bookingId) => {
	// 	console.log("inside handleRemove")
	// 	const newArray = [...this.state.bookings.filter(booking => booking.id !== bookingId)]
	// 	console.log(newArray)
	// 	this.setState({
	// 		booking: newArray
	// 	})
	// }

	updateBookings = (newBooking) => {
		// console.log(newBooking)
		this.setState({
			booking: [newBooking, ...this.state.bookings]
		}, () => this.props.history.push(`/users/${this.state.currentUser.id}`))
	}

	selectListing = (listing) => {
		this.setState({
			selectListing: listing
		})
	}

	handleShow = () => {
		this.setState({
			show: !this.state.show
		})
	}

	handleSearch = event => {
		// console.log(event.target.value)
		this.setState({
			search: event.target.value
		})
	}

	handleToggle = () => {
		this.setState({
			toggle: !this.state.toggle
		})
	}

	componentDidMount() {
		const token = localStorage.getItem("token")
		if (token) {
			// let's go get some user listing
			fetch("https://cityscape-api-backend.herokuapp.com/api/v1/auto_login", {
				method: "GET",
				headers: {
					"accepts": "application/json",
					"Authorization": token
				}
			})
				.then(res => res.json())
				.then(response => {
					if (response.errors) {
						localStorage.removeItem("user_id")
						alert(response.errors)
					} else {
						this.setCurrentUser(response.user, response.token)
					}
				})
		}
		let listingUrl = "https://cityscape-api-backend.herokuapp.com/api/v1/listings"
		fetch(listingUrl)
			.then(resp => resp.json())
			.then(listing => {
				this.setState({
					listings: listing,
					allListings: listing,
					selectedListing: listing[0]
				})//, console.log("hey"))
			})
	}

	setCurrentUser = (user, token) => {
		this.setState({
			currentUser: user,
			token: token,
			loading: !this.state.loading
		})
	}

	logOut = () => {
		this.setState({
			currentUser: null
		})

		this.props.history.push("/login")
	}

	render() {
		// console.log(this.state.currentUser)
		// console.log(this.state.listings)
		// console.log(this.state.search)
		const filteredListing = this.state.allListings.filter((listing) => {
			if (listing.neighborhood  !== null) {
				return listing.neighborhood.toLowerCase().includes(this.state.search.toLowerCase())
			}
		})

		return (
			<Grid>
				<Navbar currentUser={this.state.currentUser}
					logOut={this.logOut}
					clicked={this.state.clicked}
					show={this.handleShow}
				/>
				<Grid.Row centered>
					<Switch>
						<Route path="/listings" render={(routerProps) => {
							return <ListingContainer
								token={this.state.token}
								listings={filteredListing}
								search={this.state.search}
								selectedListing={this.state.selectedListing}
								allListings={this.state.allListings}
								selectListing={this.selectListing}
								handleSearch={this.handleSearch}
								currentUser={this.state.currentUser}
								updateBookings={this.updateBookings}
								{...routerProps} />
						}} />
						<Route path="/new_listings" render={(routerProps) => {
							return <AddListing token={this.state.token}
								handleSubmit={this.handleSubmit} currentUser={this.state.currentUser}
								loading={this.state.loading}
								handleRemoveList={this.handleRemoveList}
								handleAddNew={this.handleAddNew}
								{...routerProps} />
						}} />
						<Route path="/users/:id" render={(routerProps) => {
							return <Profile
								token={this.state.token}
								bookings={this.state.bookings}
								handleDelete={this.handleDelete}
								handleRemove={this.handleRemove}
								{...routerProps} />
						}} />
						<Route path="/login" render={(routerProps) => {
							return <Login
								toggle={this.state.toggle}
								setCurrentUser={this.setCurrentUser}
								{...routerProps} />
						}} />
						<Route path="/signup" render={(routerProps) => {
							return <Signup
								setCurrentUser={this.setCurrentUser}
								{...routerProps} />
						}} />
						<Route path="/" render={(routerProps) => {
							return <Home
								token={this.state.token}
								handleSearch={this.handleSearch}
								search={this.state.search}
								{...routerProps} />
						}} />
					</Switch>
				</Grid.Row>
			</Grid>

		);
	}
}

export default App;

