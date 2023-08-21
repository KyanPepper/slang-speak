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
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
        User : ""
    }
    this.HandleLogout = this.HandleLogout.bind(this)
  }
  render(){
    return (
      <Container maxWidth="lg">
        <Typography>
            Signed in
        </Typography>
        <Button color="primary" size="large" onClick={this.HandleLogout} >Log Out</Button>
      </Container>
    )
  }
  HandleLogout(e){
    axios.post("api/logout").then( (Response) => {
      console.log("signed out")
      localStorage.removeItem('authToken')
      this.props.navigate('/')
    })

    
  }
}
export default withRouter(Profile);
