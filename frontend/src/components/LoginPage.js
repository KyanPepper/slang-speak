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
import PracticeMode from "./PracticeMode";
import ExamMode from "./ExamMode";
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
  Radio,
} from "@mui/material";
import axios, { Axios } from "axios";

export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userLog: "",
      userCreate: "",
      passLog: "",
      passCreate: "",
      emailCreate: "",
    };
    this.HandlepassCreate = this.HandlepassCreate.bind(this);
    this.HandlepassLog = this.HandlepassLog.bind(this);
    this.HandleuserCreate = this.HandleuserCreate.bind(this);
    this.HandleuserLog = this.HandleuserLog.bind(this);
    this.HandleemailCreate = this.HandleemailCreate.bind(this);
    this.HandlesubmitLog = this.HandlesubmitLog.bind(this);
    this.HandlesubmitCreate = this.HandlesubmitCreate.bind(this);
  }
  render() {
    return (
      <Container maxWidth="lg">
        <Box>
          <Typography variant="h2">Sign-In</Typography>
          <TextField
            required
            fullWidth
            variant="filled"
            label="Username"
            value={this.state.userLog}
            onChange={this.HandleuserLog}
          ></TextField>
          <TextField
            required
            fullWidth
            variant="filled"
            label="Password"
            value={this.state.passLog}
            onChange={this.HandlepassLog}
          ></TextField>

          <Button size="large" onClick={this.HandlesubmitLog}>Go</Button>
        </Box>

        <Box>
          <Typography variant="h2">Sign-Up</Typography>
          <TextField
            required
            fullWidth
            variant="filled"
            label="Username"
            value={this.state.userCreate}
            onChange={this.HandleuserCreate}
          ></TextField>
          <TextField
            required
            fullWidth
            variant="filled"
            label="Email"
            value={this.state.emailCreate}
            onChange={this.HandleemailCreate}
          ></TextField>
          <TextField
            required
            fullWidth
            variant="filled"
            label="Password"
            value={this.state.passCreate}
            onChange={this.HandlepassCreate}
          ></TextField>
          <Button size="large" onClick={this.HandlesubmitCreate}>Go</Button>
        </Box>
      </Container>
    );
  }
  HandleuserLog(e) {
    this.setState({ userLog: e.target.value });
  }
  HandleuserCreate(e) {
    this.setState({ userCreate: e.target.value });
  }
  HandlepassLog(e) {
    this.setState({ passLog: e.target.value });
  }
  HandlepassCreate(e) {
    this.setState({ passCreate: e.target.value });
  }
  HandleemailCreate(e) {
    this.setState({ emailCreate: e.target.value });
  }
  HandlesubmitLog(e) {
    console.log(this.state.userLog + " space " + this.state.passLog);
    const loginData = {
        username: this.state.userLog,
        password: this.state.passLog
    }
  }
  HandlesubmitCreate(e){
    console.log(this.state.emailCreate + " " + this.state.passCreate +  " " + this.state.userCreate)
    const createData = {
        username: this.state.userCreate,
        password: this.state.passCreate,
        email: this.state.emailCreate
    }
    axios.post("/api/signup",createData).then(function(Response){
        console.log("worm created")
    })
  }
}
