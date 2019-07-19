import React from 'react';

import '../App.css'

class AddListingCard extends React.Component {

    handleDelete = (listingId) => {
        let url = `https://cityscape-api-backend.herokuapp.com/api/v1/listings/${listingId}`
        fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(this.props.handleRemoveList(listingId))
    }

    render() {
        const listings = this.props.loading ?
            null
            :
            this.props.currentUser.listings.map(listing => {
                if (listing.neighborhood !== "") {
                    return <div className="new-listing">
                        <div className="new-listing-card">
                            <strong>{listing.neighborhood}</strong>
                            <br />
                            {listing.borough}
                            <br />
                            <i>{listing.description}</i>
                            <br />
                            ${listing.price}/night
                        <br /> <button onClick={() => this.handleDelete(listing.id)}>DELETE</button>
                        </div>
                    </div>
                }
            })
        return (
            <div>
                {listings}
            </div>
        )
    }
}

export default AddListingCard;


// {this.props.currentUser.map(listing=>{
//     if(listing.neighborhood !== null) {
//     return listing.neighborhood
// }})}

//{this.props.currentUser.listings}