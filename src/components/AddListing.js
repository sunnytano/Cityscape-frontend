import React from 'react'
import AddListingCard from './AddListingCard'
import '../App.css'

class AddListing extends React.Component {

  state = {
    neighborhood: "",
    borough: "",
    description: "",
    min_night: "",
    price: "",
    listings: []
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault();
    let newListing = {
      neighborhood: this.state.neighborhood,
      borough: this.state.borough,
      description: this.state.description,
      min_night: this.state.min_night,
      price: this.state.price
    }
    this.props.handleAddNew(newListing)

    const newListingURL = "https://cityscape-api-backend.herokuapp.com/api/v1/listings"
    fetch(newListingURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json",
        "Authorization": this.props.token
      },
      body: JSON.stringify(newListing)
    })
      .then(resp => resp.json())
      .then(data => {
        console.log(data)
        this.props.history.push(`/new_listings`)
      })
  }

  render() {
    console.log("HERE", this.props.currentUser)
    console.log(this.props.token)
    console.log(this.state.listings)
    const { neighborhood, borough, description, min_night, price, } = this.state
    return (
      <div>
        <div className="addlisting-img">
          <h2 className="addlisting-title">Add a Listing</h2>
          <form onSubmit={this.handleSubmit} className="addlisting-form">
            <input onChange={this.handleChange} value={neighborhood} name="neighborhood" placeholder="Neighborhood" /><br />
            <input onChange={this.handleChange} value={borough} name="borough" placeholder="Borough" /><br />
            <input onChange={this.handleChange} value={description} name="description" placeholder="Description" /><br />
            <input onChange={this.handleChange} value={price} name="price" placeholder="Price" /><br />
            <input type="submit" />
          </form>
          <div>
            <AddListingCard
              handleRemoveList={this.props.handleRemoveList}
              currentUser={this.props.currentUser}
              loading={this.props.loading} />
          </div>
        </div>
      </div>
    )
  }
}

export default AddListing;
