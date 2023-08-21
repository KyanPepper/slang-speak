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
import LoginPage from "./LoginPage";
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
import { Radio, RadioGroup, FormControlLabel } from "@mui/material";
import { alignProperty } from "@mui/material/styles/cssUtils";
class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      practice: true,
      exam: false,
      questions: 10,
      UserSigned: true,
    };
  }
  render() {
    return (
      <Container>
        <Button color="warning">Log Out</Button>
      </Container>
    );
  }
}

export default withRouter(LoginPage);
