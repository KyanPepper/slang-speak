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
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
        User : ""
    }
  }
  render(){
    return (
      <Container maxWidth="lg">
        <Typography>
            Signed in
        </Typography>
        <Button color="primary" size="large">Log Out</Button>
      </Container>
    )
  }

}
export default withRouter(Profile);
