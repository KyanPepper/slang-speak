import { createTheme } from "@mui/system";
const Slangtheme = createTheme({
  palette: {
    primary: {
      main: "#3399FF", // Light blue
    },
    secondary: {
      main: "#FF9999", // Light coral
    },
    text: {
      primary: "#333333", // Dark gray
      secondary: "#666666", // Medium gray
    },
    background: {
      default: "#F5F5F5", // Light gray
    },
  },
  typography: {
    fontFamily: "Poppins, Arial, sans-serif",
    h1: {
      fontWeight: 700,
      fontSize: "2.5rem",
      color: "#333333",
    },
    h2: {
      fontWeight: 600,
      fontSize: "2rem",
      color: "#333333",
    },
    h3: {
      fontWeight: 500,
      fontSize: "1.8rem",
      color: "#333333",
    },
    h4: {
      fontWeight: 500,
      fontSize: "1.5rem",
      color: "#333333",
    },
    h5: {
      fontWeight: 500,
      fontSize: "1.2rem",
      color: "#333333",
    },
    h6: {
      fontWeight: 500,
      fontSize: "1rem",
      color: "#333333",
    },
    body1: {
      fontSize: "1rem",
      color: "#333333",
    },
    body2: {
      fontSize: "0.9rem",
      color: "#666666",
    },
  },
  shape: {
    borderRadius: 12, 
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", 
        },
      },
    },
    MuiBox: {
      styleOverrides: {
        root: {
          border: "1px solid #CCCCCC", 
          padding: "16px", 
        },
      },
    },
  },
});

export default Slangtheme;
