import React from "react";
import '../App.css'
import { Button, Header, Image, Modal, Form, Input } from 'semantic-ui-react'

class Listingcard extends React.Component {

  getBooking = (event, listId, userId) => {
    event.preventDefault()
    fetch('https://cityscape-api-backend.herokuapp.com/api/v1/bookings', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        'Accept': "application/json",
        "Authorization": this.props.token
      },
      body: JSON.stringify({
        user_id: userId,
        listing_id: listId
      })
    }).then(res => res.json())
      .then(data => this.props.updateBookings(data))
  }

  handleClick = () => {
    this.props.selectListing(this.props.listing);
  }

  render() {
    const { neighborhood, name, price } = this.props.listing
    return (
      <div className="listing" onClick={this.handleClick}>
        <img src={this.props.listing.image_small} className="listing-picture" />
        <div className="listing-title">{neighborhood}
          <br/>
          {name}
          <br/>
          {price}
        </div>
        <Modal trigger={<button>Book</button>}>
          <Modal.Header >
            <h1 style={{fontFamily: 'Rock Salt', height: "20%"}}>
              {neighborhood}
            </h1>
          </Modal.Header>
          <h2 style={{fontFamily: "Gothic A1"}}>
            {this.props.listing.name}
          </h2>
          <img src={this.props.listing.image} />
          <Form style={{fontFamily: "Gothic A1"}} onSubmit={(e) => this.getBooking(e, this.props.listing.id, this.props.currentUser.id)}>
              <Button style={{fontFamily: "Gothic A1"}} type="submit">Book Listing</Button>
          </Form>
        </Modal>
        <br />
      </div>
    );
  }
}

export default Listingcard;
