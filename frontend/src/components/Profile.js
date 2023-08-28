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
  Stack,
} from "@mui/material";
import axios from "axios";
import { alignProperty } from "@mui/material/styles/cssUtils";
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      User: "",
      AvgScore: 0,
      lastFive: [],
    };
    this.HandleLogout = this.HandleLogout.bind(this);
  }
  componentDidMount() {
    axios
      .get("/api/getUser")
      .then((response) => {
        const username = response.data.username;
        this.setState({ User: username });
        console.log(this.state.User);
      })
      .catch((error) => {
        console.error("Error", error);
      });
    axios
      .get("/api/average-score")
      .then((response) => {
        const score = response.data.average_score;
        this.setState({ AvgScore: score });
        console.log(score);
      })
      .catch((error) => {
        console.error("Error", error);
      });
    axios
      .get("/api/last-5-scores")
      .then((response) => {
        const last = response.data;
        this.setState({ lastFive: last });
        console.log(last);
      })
      .catch((error) => {
        console.error("Error", error);
      });
  }
  render() {
    return (
      <Container maxWidth="lg">
        <Typography align="center" variant="h2" fontFamily={"monospace"}>
          Signed in as {this.state.User.username}
        </Typography>
        <Box alignItems={"center"} alignContent={"center"} textAlign={"center"}>
          <Button
            color="error"
            size="large"
            variant="contained"
            onClick={this.HandleLogout}
          >
            Log Out
          </Button>
        </Box>
        <Typography align="left" variant="h4" fontFamily={"monospace"}>
          Average Score: {this.state.AvgScore}%
        </Typography>
        <Stack divider>
          <Typography align="left" variant="h4" fontFamily="monospace">
            Last 5 Scores:
          </Typography>
          {this.state.lastFive.map((score, index) => (
            <Typography key={index} align="left" variant="h5">
              Score {index + 1}: {score.score}%   {score.date}
            </Typography>
          ))}
        </Stack>
      </Container>
    );
  }
  HandleLogout(e) {
    axios.post("api/logout").then((Response) => {
      console.log("signed out");
      localStorage.removeItem("authToken");
      this.props.navigate("/");
      window.location.reload();
    });
  }
}
export default withRouter(Profile);
