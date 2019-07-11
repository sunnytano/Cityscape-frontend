import React from 'react'
import { Link } from 'react-router-dom'
import YoutubeBackground from 'react-youtube-background'
import '../App.css'

class Home extends React.Component {

  state = {
    show: false
  }

  handleShow = () => {
    this.setState({
      show: !this.state.show
    })
  }

  render() {
    //<img className="ui large rounded image" src="https://media2.giphy.com/media/VM3cTSXyuuXQc/source.gif" />
    //<img className="ui large rounded image" src="https://media.giphy.com/media/fAxJoWdIK7kSQ/giphy.gif" />
    console.log(this.props)
    return (
      <div className="home-container">
        <h1 className="tagline">Cityscape</h1>
        <input className="search-home" type="text" placeholder="Search a listing"
          value={this.props.search}
          onChange={this.props.handleSearch} />
        <Link onClick={this.handleShow} to='/listings'><i className="search icon"></i></Link>
        <br />
        <br />
        <img className="ui large rounded image" src="https://media.giphy.com/media/fAxJoWdIK7kSQ/giphy.gif" />
        <br />
        <br />
      </div>
    )
  }
}

export default Home;