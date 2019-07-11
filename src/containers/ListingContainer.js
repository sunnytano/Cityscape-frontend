import React from 'react'
import GoogleMapReact from 'google-map-react';
import Marker from '../components/Marker';
import ListingCard from '../components/ListingCard'
import '../App.css'

class ListingContainer extends React.Component {

  render() {

    console.log(this.props)
    let center = {
      lat: 40.73, lng: -73.93
    };
    if (this.props.selectedListing && this.props.selectedListing.latitude !== null && this.props.selectedListing.longitude !== null) {
      center = { lat: this.props.selectedListing.latitude || 40.73, lng: this.props.selectedListing.longitude || -73.93 }
    }
    return (
      <div className="listing-div">
        <div className="listing-row">
          <div className="search">
            <input type="text" placeholder="Search a listing"
              value={this.props.search}
              onChange={this.props.handleSearch} />
          </div>
          <div className="listing-data">
            {this.props.listings.map((listing) => {
              if (listing.name && listing.price !== null) {
                return <ListingCard key={listing.id} listing={listing}
                  selectListing={this.props.selectListing}
                  currentUser={this.props.currentUser}
                  updateBookings={this.props.updateBookings}
                  token={this.props.token} />
              }
            })}
          </div>
        </div>
        <div className="map">
          <GoogleMapReact
            defaultCenter={center}
            defaultZoom={11}>
            {this.props.listings.map((listing) => {
              return <Marker
                lat={listing.latitude || 40.73}
                lng={listing.longitude || -73.93} {...listing}
                selected={listing === this.props.selectedListing} />
            })}
          </GoogleMapReact>
        </div>
      </div>
    )
  }
}

export default ListingContainer;