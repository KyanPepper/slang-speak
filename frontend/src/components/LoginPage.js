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
  Dialog,
  DialogContentText,
  DialogTitle,
  DialogActions,
  shouldSkipGeneratingVar,
} from "@mui/material";
import axios, { Axios } from "axios";

 class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userLog: "",
      userCreate: "",
      passLog: "",
      passCreate: "",
      emailCreate: "",
      SignDiaglog: false,
      UpDialog : false,
    };
    this.HandlepassCreate = this.HandlepassCreate.bind(this);
    this.HandlepassLog = this.HandlepassLog.bind(this);
    this.HandleuserCreate = this.HandleuserCreate.bind(this);
    this.HandleuserLog = this.HandleuserLog.bind(this);
    this.HandleemailCreate = this.HandleemailCreate.bind(this);
    this.HandlesubmitLog = this.HandlesubmitLog.bind(this);
    this.HandlesubmitCreate = this.HandlesubmitCreate.bind(this);
    this.HandleCloseDialog = this.HandleCloseDialog.bind(this);
    this.HandleCloseUpDia = this.HandleCloseUpDia.bind(this);
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

          <Button size="large" onClick={this.HandlesubmitLog}>
            Go
          </Button>
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
          <Button size="large" onClick={this.HandlesubmitCreate}>
            Go
          </Button>
          <Dialog open={this.state.SignDiaglog} onClose={this.HandleCloseDialog}>
            <DialogTitle>User Sign in Error</DialogTitle>
            <DialogContentText>
              Check Password or Username for correct authentication
            </DialogContentText>
          </Dialog>
          <Dialog open={this.state.UpDialog} onClose={this.HandleCloseUpDia}>
            <DialogTitle>User Sign Up Error</DialogTitle>
            <DialogContentText>
              Email or Username Already Exits
            </DialogContentText>
          </Dialog>
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
  HandleCloseDialog(e){
    this.setState({SignDiaglog: false})
  }
  HandleCloseUpDia(e){
    this.setState({UpDialog : false})
  }
  HandlesubmitLog(e) {
    e.preventDefault();
    console.log(this.state.userLog + " space " + this.state.passLog);
    const loginData = {
      username: this.state.userLog,
      password: this.state.passLog,
    };
    axios
      .post("/api/login", loginData)
      .then((Response) => {
        const token = Response.data.token;
        localStorage.setItem('authToken', token);
        console.log("Signed in");
        this.props.navigate('/')
      })
      .catch((error) => {
        this.setState({SignDiaglog : true})
      });
  }
  HandlesubmitCreate(e) {
    e.preventDefault();
    console.log(
      this.state.emailCreate +
        " " +
        this.state.passCreate +
        " " +
        this.state.userCreate
    );
    const createData = {
      username: this.state.userCreate,
      password: this.state.passCreate,
      email: this.state.emailCreate,
    };
    axios
      .post("/api/signup", createData)
      .then( (Response) =>{
        console.log("account created");
      })
      .catch( (error) => {
        this.setState({UpDialog : true})
      });
  }
}
export default withRouter(LoginPage);

