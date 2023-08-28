import React, { Component } from "react";
import { withRouter } from "./withRouter";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Redirect,
  Navigate,
  useNavigate,
} from "react-router-dom";
import {
  Button,
  Grid,
  Typography,
  TextField,
  FormControl,
  FormHelperText,
  FormLabel,
  colors,
  Box,
  Container,
  AppBar,
  Toolbar,
} from "@mui/material";
import axios from "axios";
import { alignProperty } from "@mui/material/styles/cssUtils";
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
        User : ""
    }
    this.HandleLogout = this.HandleLogout.bind(this)
  }
  componentDidMount(){
    axios.get("/api/getUser")
    .then(response => {
      const username = response.data.username;
      this.setState({ User: username });
      console.log(this.state.User)
    })
    .catch(error => {
      console.error("Error", error);
    });
  }
  render(){
    return (
      <Container maxWidth="lg">
        <Typography align="left" variant="h2" fontFamily={"monospace"}>
            Signed in as {this.state.User.username}
        </Typography>
        <Box alignItems={"center"} alignContent={"center"} textAlign={"center"}>
          <Button color="error" size="large" variant="contained"  onClick={this.HandleLogout} >Log Out</Button>
        </Box>
      </Container>
    )
  }
  HandleLogout(e){
    axios.post("api/logout").then( (Response) => {
      console.log("signed out")
      localStorage.removeItem('authToken')
      this.props.navigate('/')
      window.location.reload();
    })

    
  }
}
export default withRouter(Profile);
