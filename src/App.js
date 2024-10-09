import logo from "./logo.svg";
import "./App.css";
import { fetchJobs } from "./data/api";
import { useEffect, useState } from "react";
import TopNav from "./componets/TopNav";
import {
  Grid,
  Box,
  IconButton,
  Button,
  useMediaQuery,
  Container,
  useColorScheme,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Carousel from "react-material-ui-carousel";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes,
} from "react-router-dom";
import Card from "./componets/Card";
import { createTheme, ThemeProvider } from "@mui/material";
import LoginPage from "./componets/LoginPage";
import { AuthProvider } from "./pages/AuthContext";
import JobDetailModal from "./componets/JobDetailModal";

function App() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const itemsPerPage = 6;
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(jobs.length / itemsPerPage);
  const isMobileView = useMediaQuery("(max-width:1000px)");
  const handleNext = () => {
    setPage((prevPage) => (prevPage + 1) % totalPages);
  };

  const handlePrev = () => {
    setPage((prevPage) => (prevPage - 1 + totalPages) % totalPages);
  };

  const handlePageSelect = (selectedPage) => {
    setPage(selectedPage);
  };
  const currentItems = jobs.slice(
    page * itemsPerPage,
    (page + 1) * itemsPerPage
  );
  useEffect(() => {
    const getJobs = async () => {
      const data = await fetchJobs();
      setJobs(data);
      setLoading(false);
    };
    getJobs();
  }, []);

  // theme in MUI
  const [mode, setMode] = useState("light");
  const darkTheme = createTheme({
    palette: {
      mode: mode,
      background: {
        default: "#424242",
      },
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <AuthProvider>
        <Router>
          <TopNav setMode={setMode} mode={mode} />
          {/* login form */}
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/jobs/:jobId" element={<JobDetailModal jobs={jobs}/>} />
          </Routes>
          {/* carousel */}
          <div
            style={{
              backgroundColor: mode === "dark" ? "#424242" : "#ffffff",
              color: mode === "dark" ? "#ffffff" : "#000000",
            }}
          >
            <h1 style={{ textAlign: "center", margin: 0, padding: 10 }}>
              Jobs list
            </h1>
            {isMobileView ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                {jobs.map((job) => (
                  <div style={{ marginBottom: 5 }}>
                    <Card
                      id={job.id}
                      title={job.title}
                      skills={job.skills}
                      description={job.description}
                    />
                  </div>
                ))}
              </Box>
            ) : (
              <Box sx={{ width: "85%", margin: "0 auto" }}>
                <Carousel
                  navButtonsAlwaysInvisible={true}
                  indicators={false}
                  sx={{ marginBottom: 1, paddingBottom: 5, width: "100%" }}
                >
                  <Grid container spacing={1} justifyContent="center">
                    {currentItems.map((job, index) => (
                      <Grid item xs={1} sm={2} md={4} key={index}>
                        <Card
                          id={job.id}
                          title={job.title}
                          skills={job.skills}
                          description={job.description}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Carousel>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  {/* Previous Arrow */}
                  <IconButton onClick={handlePrev}>
                    <ArrowBackIcon />
                  </IconButton>

                  {/* Page Numbers */}
                  {Array.from({ length: totalPages }, (_, i) => (
                    <Button
                      key={i}
                      onClick={() => handlePageSelect(i)}
                      variant={i === page ? "contained" : "outlined"}
                      color={i === page ? "primary" : "default"}
                    >
                      {i + 1}
                    </Button>
                  ))}

                  {/* Next Arrow */}
                  <IconButton onClick={handleNext}>
                    <ArrowForwardIcon />
                  </IconButton>
                </Box>
              </Box>
            )}
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
