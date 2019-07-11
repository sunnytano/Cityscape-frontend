import React from 'react';
import { Form, Button } from 'semantic-ui-react';

class Login extends React.Component {

	state = {
		email: "",
		password: ""
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSubmit = () => {
		// console.log("LOGGING IN", this.state)
		fetch("http://localhost:3333/api/v1/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Accepts": "application/json",
			},
			body: JSON.stringify(this.state)
		})
			.then(res => res.json())
			.then(response => {
				if (response.errors) {
					alert(response.errors)
				} else {
					// response is the user object
					console.log(response)
					localStorage.setItem("token", response.token)
					this.props.setCurrentUser(response.user, response.jwt)
					this.props.history.push("/")
			}
		})
	}

	render() {
		return (
			<div>
				<div>
					{
					!this.props.toggle
							?
							<div>
							<div className="login-image">
								<Form onSubmit={this.handleSubmit}>
									<Form.Field>
										<label
										style={{fontFamily: 'Rock Salt'}}>Email</label>
										<input
											style={{width: "30vw", padding: "10px"}}
											className="login-input"
											onChange={this.handleChange}
											name="email"
											value={this.state.email}
											placeholder='email' />
									</Form.Field>
									<Form.Field>
										<label style={{fontFamily: 'Rock Salt'}}>Password</label>
										<input 
											style={{width: "30vw"}}
											className="login-input"
											onChange={this.handleChange}
											type="password" 
											name="password"
											value={this.state.password}
											placeholder='Password' />
									</Form.Field>
									<Button type='submit'
											style={{backgroundColor: "white"}}>
										Submit
									</Button>
								</Form>
							</div>
							</div>
							:
							null
					}
				</div>
			</div>
		)
	}
}

export default Login;