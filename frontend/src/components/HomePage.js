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
import Profile from "./Profile";
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
class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      practice: true,
      exam: false,
      questions: 10,
      UserSigned: true
    };
   

    this.handleQuestions = this.handleQuestions.bind(this);
    this.handleMode = this.handleMode.bind(this);
    this.handalGo = this.handalGo.bind(this);
    this.changePage = this.changePage.bind(this);
    this.handalLog = this.handalLog.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }
  componentDidMount() {
    const token = localStorage.getItem('authToken');
    console.log("compoent Mounted")
    if(token != null) {
      this.setState({ UserSigned: false });
      console.log("user signed in" + token)
    }
  }
  
  render() {
    return (
      <Routes>
        <Route
          path="/"
          element={
            <Container maxWidth="lg"  >
              <AppBar position="relative" color="transparent">
                <Toolbar>
                  <Button variant="outlined" color="primary" style={{ marginRight: "55px" }} onClick={this.handalLog}>
                    Sign-In/Sign-up
                  </Button>
                  <Button variant="outlined" disabled={this.state.UserSigned} color="primary" style={{ marginRight: "55px" }}>
                    Profile
                  </Button>
                  <Button variant="outlined" color="primary">
                    FAQ
                  </Button>
                </Toolbar>
              </AppBar>
              <Grid
                direction={"column"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Typography component="h1" variant="h1">
                  SlangSpeak
                </Typography>
                <Typography component="h3" variant="h3">
                  Language Learning
                </Typography>
                <RadioGroup
                  name="use-radio-group"
                  defaultValue="practice"
                  onChange={this.handleMode}
                >
                  <FormControlLabel
                    value="practice"
                    label="Practice"
                    control={<Radio />}
                  />
                  <FormControlLabel disabled={this.state.UserSigned}
                    value="exam"
                    label="Exam"
                    control={<Radio />}
                  />
                </RadioGroup>
                
                <TextField
                  required={true}
                  onBlur={this.handleBlur}
                  value={this.state.questions}
                  helperText={"Choose Question Amount 1-50"}
                  onChange={this.handleQuestions}
                  type="number"
                  inputProps={{
                    min: 1,  
                    max: 50, 
                  }}
                ></TextField>
                <Button
                  size="large"
                  color="primary"
                  variant="contained"
                  onClick={this.handalGo}
                >
                  Go
                </Button>
              </Grid>
             </Container>
          }
        ></Route>

        <Route path="/practice" element={<PracticeMode />} />
        <Route path="/exam" element={<ExamMode />} />
        <Route path="/login" element ={<LoginPage/>} />
        <Route path = "/profile" element={<Profile/>}/>
      </Routes>
    );
  }
  changePage() {
    console.log("in change page" + this.state.exam);
    if (this.state.exam == true) {
      console.log("goin to exam");
      this.props.navigate("/exam");
    } else {
      console.log("goin to Practice");
      this.props.navigate("/practice");
    }
  }
  handleQuestions(e) {
    this.setState({ questions: parseInt(e.target.value) });
  }
  handleBlur(e){
    if (parseInt(e.target.value) < 1){
      this.setState({questions:1})
    }else if(parseInt(e.target.value) > 50){
      this.setState({questions:50})
    }
  }

  handleMode(e) {
    if (e.target.value == "exam") {
      this.setState({ exam: true, practice: false });
    } else {
      this.setState({ exam: false, practice: true });
    }
    console.log(e.target.value);
  }
  handalGo(e) {
    const { questions, exam, practice } = this.state;
    const roomData = {
      username: "Guest",
      practiceMode: practice,
      examMode: exam,
      questions: questions,
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(roomData),
    };

    fetch("/api/room", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data));
    this.changePage();
  }
  handalLog(e){
    this.props.navigate("/login")
  }
};
export default withRouter(HomePage);
