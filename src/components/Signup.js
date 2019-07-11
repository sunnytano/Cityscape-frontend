import React from 'react'
import { Form, Button } from 'semantic-ui-react'

class SignupForm extends React.Component {
	state = {
		first_name: "",
		last_name: "",
		email: "",
		password: "",
		passwordConfirmation: "",
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	createUser = () => {
		fetch("http://localhost:3333/api/v1/users", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Accepts": "application/json",
			},
			body: JSON.stringify(this.state)
		})
			.then(res => res.json())
			.then((response) => {
				if (response.errors) {
					alert(response.errors)
				} else {
					console.log(response)
					localStorage.setItem("token", response.token)
					this.props.setCurrentUser(response.user)
					this.props.history.push('/')
				}
			})
	}

	handleSubmit = () => {
		if (this.state.password === this.state.passwordConfirmation) {
			this.createUser()
		} else {
			alert("The passwords do not match, please try again")
		}
	}

	render() {
		return (
			<div className="signup-image">
			<Form onSubmit={this.handleSubmit}>
				<Form.Field>
					<label style={{color: "white", fontFamily: "Rock Salt"}}>Email</label>
					<input onChange={this.handleChange} 
					style={{width: "35vw"}}
					name="email" 
					value={this.state.email} 
					placeholder='Email' />
				</Form.Field>
				<Form.Field>
					<label style={{color: "white", fontFamily: "Rock Salt"}}>First Name</label>
					<input 
					onChange={this.handleChange} 
					name="first_name" 
					value={this.state.first_name} 
					placeholder='First Name' />
				</Form.Field>
				<Form.Field>
					<label style={{color: "white", fontFamily: "Rock Salt"}}>Last Name</label>
					<input onChange={this.handleChange} 
					name="last_name" 
					value={this.state.last_name} 
					placeholder='Last Name' />
				</Form.Field>
				<Form.Field>
					<label style={{color: "white", fontFamily: "Rock Salt"}}>Password</label>
					<input onChange={this.handleChange} 
					type="password" 
					name="password" 
					value={this.state.password} 
					placeholder='Password' />
				</Form.Field>
				<Form.Field>
					<label style={{color: "white", fontFamily: "Rock Salt"}}>Password Confirmation</label>
					<input 
					onChange={this.handleChange} 
					type="password"
					name="passwordConfirmation" 
					value={this.state.passwordConfirmation}
					placeholder='Password Confirmation' />
				</Form.Field>
				<Button type='submit'>Submit</Button>
			</Form>
			</div>
		)
	}
}

export default SignupForm