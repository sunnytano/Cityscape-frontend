import React from 'react'

class BookingCard extends React.Component {

    handleDelete = (bookingId) => {
        let url = `https://cityscape-api-backend.herokuapp.com/api/v1/bookings/${bookingId}`
        fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(this.props.handleRemove(bookingId))
    }

    render() {
        return (
            <div style={{ fontFamily: "Gothic A1" }} className="booking-card">
                    {this.props.booking.listing.name}
                {this.props.booking.listing.neighborhood}
                    <img className="booking-image" alt="booking"
                        src={this.props.booking.listing.image_small} />
                    {this.props.booking.listing.price}
                <button className="delete-button"
                    onClick={() => this.handleDelete(this.props.booking.id)}>
                    DELETE
                </button>
            </div>
        )
    }
}

export default BookingCard;

