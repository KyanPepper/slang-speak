import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContentText,
} from "@mui/material";
import React, { Component } from "react";
import { ThemeProvider } from "@emotion/react";
import Slangtheme from "./WebsiteTheme";
import NextPlanIcon from "@mui/icons-material/NextPlan";
import axios from "axios";
import { withRouter } from "./withRouter";
import { Route } from "react-router-dom";

document.body.style.backgroundColor = "#F5F5F5";
class PracticeMode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionList: [],
      roomData: [],
      currentQuestion: 1,
      questionsCorrect: 0,
      mixedArr: [],
      currentTerm: [],
      usedDefinitions: [],
      dia: false,
    };
    this.shuffleArray = this.shuffleArray.bind(this);
    this.pickThreeDef = this.pickThreeDef.bind(this);
    this.handleChoice = this.handleChoice.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
  }

  componentDidMount() {
    axios
      .get("/api/DictionaryWords")
      .then((response) => {
        this.setState({ questionList: response.data });
        console.log(this.state.questionList);
        this.setState({
          currentTerm: this.state.questionList[this.state.currentQuestion],
        });
        console.log(this.state.currentTerm);
      })
      .catch((error) => {
        console.log("could not retrive dictionary words");
      });

    axios
      .get("/api/getRoom")
      .then((response) => {
        this.setState({ roomData: response.data });
        console.log(this.state.roomData);
        let temparr = this.pickThreeDef(
          this.state.questionList,
          this.state.currentQuestion,
          3
        );
        let finalArr = [
          this.state.questionList[temparr[0]],
          this.state.questionList[temparr[1]],
          this.state.questionList[temparr[2]],
          this.state.currentTerm,
        ];
        finalArr = this.shuffleArray(finalArr);
        console.log(finalArr);
        this.setState({ mixedArr: finalArr });
        console.log(this.state.mixedArr);
      })
      .catch((error) => {
        console.log("could not retrive question amount");
      });
  }
  render() {
    return (
      <Container maxWidth="lg">
        <Typography
          variant="h1"
          sx={{
            textAlign: "center",
            color: Slangtheme.palette.primary.main,
          }}
        >
          Practice Mode
        </Typography>
        <Typography
          variant="h3"
          align="center"
          sx={{ color: Slangtheme.palette.text.secondary }}
        >
          Questions: {this.state.currentQuestion} of{" "}
          {this.state.roomData.questions}
        </Typography>
        <Box textAlign={"center"} paddingBottom={4}>
          <Button
            variant="contained"
            size="large"
            endIcon={<NextPlanIcon></NextPlanIcon>}
            style={{ justifyContent: "center" }}
            onClick={() => this.handleChoice(this.state.currentTerm.word)}
          >
            Skip
          </Button>
        </Box>
        <Typography
          variant="h4"
          align="center"
          textTransform={"capitalize"}
          fontFamily={"monospace"}
        >
          {this.state.currentTerm.word}
        </Typography>
        <Grid container spacing={8} color={"F5F5F5"}>
          {this.state.mixedArr.map((item, index) => (
            <Grid item xs={12} sm={6} md={6} lg={6} key={index}>
              <Box
                sx={{
                  pt: 3,
                  pb: 3,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: 4,
                  height: "80%",
                  color: "black",
                  border: "3px solid #CCCCCC",
                  borderRadius: "8px",
                  backgroundColor: "white",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "#EEEEEE",
                  },
                }}
                onClick={() => this.handleChoice(item.word)}
              >
                <Typography
                  variant="body1"
                  mt={2}
                  fontFamily={"sans-serif"}
                  border={"ThreeDLightShadow"}
                  textTransform={"capitalize"}
                  fontWeight={"bold"}
                  textAlign={"center"}
                >
                  {item.definition}
                </Typography>
              </Box>
            </Grid>
          ))}
          <Dialog open={this.state.dia} onClose={this.handleDialogClose}>
            <DialogTitle variant="h2" fontFamily={"monospace"}>
              Practice Score
            </DialogTitle>
            <DialogContentText variant="h3" fontFamily={"monospace"}>
              Score: {this.state.questionsCorrect} /{" "}
              {this.state.currentQuestion -1}
            </DialogContentText>
            <DialogContentText variant="h3" fontFamily={"monospace"}>
              Unsubmitted Score :{" "}
              {Math.round(
                ((this.state.questionsCorrect) /
                  (this.state.currentQuestion-1 )) *
                  100
              )}
              %
            </DialogContentText>
          </Dialog>
        </Grid>
      </Container>
    );
  }
  shuffleArray(array) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  }
  pickThreeDef(array, excludeIndex, count) {
    const indices = [];
    while (indices.length < count) {
      const randomIndex = Math.floor(Math.random() * array.length);
      if (randomIndex !== excludeIndex && !indices.includes(randomIndex)) {
        indices.push(randomIndex);
      }
    }
    return indices;
  }
  handleChoice(e) {
    if (e === this.state.currentTerm.word) {
      this.setState((prevState) => ({
        questionsCorrect: prevState.questionsCorrect + 1,
      }));
    }

    this.setState((prevState) => ({
      currentQuestion: prevState.currentQuestion + 1,
      currentTerm: prevState.questionList[prevState.currentQuestion + 1],
    }));

    if (this.state.currentQuestion >= this.state.roomData.questions) {
      console.log("over");
      console.log("score" + (this.state.questionsCorrect + 1));
      this.setState({ dia: true });
      return "";
    }

    let temparr = this.pickThreeDef(
      this.state.questionList,
      this.state.currentQuestion,
      3
    );

    let finalArr = [
      this.state.questionList[temparr[0]],
      this.state.questionList[temparr[1]],
      this.state.questionList[temparr[2]],
      this.state.questionList[this.state.currentQuestion + 1],
    ];

    finalArr = this.shuffleArray(finalArr);
    this.setState({ mixedArr: finalArr });
  }
  handleDialogClose(e) {
    this.setState({ dia: false });
    this.props.navigate("/")
    window.location.reload();
  }
}
export default withRouter(PracticeMode)