import React from 'react'
import BookingCard from './BookingCard.js'
import '../App.css'

class Profile extends React.Component {
    state = {
        users: {
            bookings: []
        }
    }
    componentDidMount() {
        console.log("mounted")
        this.getUsers()
    }
    getUsers = () => {
        const userId = this.props.match.params.id
        const userUrl = `http://localhost:3333/api/v1/users/${userId}`
        fetch(userUrl)
            .then(resp => resp.json())
            .then(data => {

                this.setState({
                    users: data
                }, console.log('our data in componentDidMount', this.state))
            })
    }

    remove = (remBooking) => {
        const newBookings = this.state.users.bookings.filter(booking => booking.id !== remBooking)
        let user = { ...this.state.users, bookings: newBookings }
        if (window.confirm("Delete?")) {
            this.setState({
                users: user
            }
            )
        }
    }

    render() {
        console.log("inside render: ", this.state)
        console.log("WHYYYY", this.state.users)
        if (this.state.users) {
            return (
                <div>
                    <div className="profile-bg">
                        <div className="profile-container">
                            <div className="profile-card">
                                <h2>Welcome, {this.state.users.first_name} {this.state.users.last_name}! </h2>
                                <h3>Email: {this.state.users.email}</h3>
                            </div>

                            <br />
                            <br />
                            <h3 className="booking-header">Here are your bookings:</h3>
                            <div className="booking-div">
                                <p>{this.state.users.bookings.map(booking => {
                                    return <BookingCard
                                        key={booking.id} booking={booking}
                                        remove={this.remove}
                                        handleRemove={this.remove} />
                                })}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}


export default Profile;
