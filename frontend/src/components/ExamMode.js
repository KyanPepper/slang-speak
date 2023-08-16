import { Box, Container, Typography, Paper, Grid, Button } from "@mui/material";
import React, { Component } from "react";
import Slangtheme from "./WebsiteTheme";
import axios from 'axios'
const numOfQuestions = 10;

const questionList = [
  { title: "A", description: "Description 1" },
  { title: "B", description: "Description 2" },
  { title: "C", description: "Description 3" },
  { title: "D", description: "Description 4" },
];

export default class ExamMode extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container maxWidth="lg">
        <Typography
          variant="h1"
          sx={{
            textAlign: "center",
            color: Slangtheme.palette.secondary.main,
          }}
        >
          Exam Mode
        </Typography>
        <Typography
          variant="h3"
          align="center"
          sx={{ color: Slangtheme.palette.text.secondary }}
        >
          Questions: 1 of {numOfQuestions}
        </Typography>
        <Box textAlign={"center"} paddingBottom={4}></Box>
        <Grid container spacing={8} color={"F5F5F5"}>
          {questionList.map((item, index) => (
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
              <Button variant="contained" color="error">
                Select
              </Button>
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }
}
