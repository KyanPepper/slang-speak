import { Box, Container, Typography, Paper, Grid, Button } from "@mui/material";
import React, { Component } from "react";
import { ThemeProvider } from "@emotion/react";
import Slangtheme from "./WebsiteTheme";
import NextPlanIcon from "@mui/icons-material/NextPlan";
import axios from "axios";

const numOfQuestions = 10;
document.body.style.backgroundColor = "#F5F5F5";
const tempList = [
  { title: "A", description: "Description 1" },
  { title: "B", description: "Description 2" },
  { title: "C", description: "Description 3" },
  { title: "D", description: "Description 4" },
];

export default class PracticeMode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionList:[],
      roomData: [],
    };
  }

componentDidMount(){
  axios.get("/api/DictionaryWords")
  .then(response => {
    this.setState({questionList: response.data}); 
    console.log(this.state.questionList)
  })
  .catch(error => {
    console.log("could not retrive dictionary words")
  });
  axios.get("/api/getRoom")
  .then(response => {
    this.setState({roomData: response.data}); 
    console.log(this.state.roomData)
  })
  .catch(error => {
    console.log("could not retrive question amount")
  });



}
  render() {
    return (
      <Container maxWidth="lg" >
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
          Questions: 1 of {numOfQuestions}
        </Typography>
        <Box textAlign={"center"} paddingBottom={4}>
          <Button
            variant="contained"
            size="large"
            endIcon={<NextPlanIcon></NextPlanIcon>}
            style={{ justifyContent: "center" }}
          >
            Skip
          </Button>
        </Box>
        <Grid container spacing={8} color={"F5F5F5"}>
          {tempList.map((item, index) => (
            <Grid item xs={12} sm={6} md={6} lg={6} key={index}>
              <Box
                sx={{
                  pt: 3,
                  pb: 3,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: 4,
                  color: "black",
                  border: "3px solid #CCCCCC",
                  borderRadius: "8px",
                  textAlign: "center",
                  backgroundColor: "white",
                }}
              >
                <Typography variant="h3" mt={2}>
                  {item.title}
                </Typography>
                <Typography variant="body1" mt={2}>
                  {item.description}
                </Typography>
              </Box>
              <Button variant="contained">Select</Button>
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }
}
