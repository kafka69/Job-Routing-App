import React, { useContext } from "react";
import { Paper, Typography, Chip, Button, Box } from "@mui/material";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../pages/AuthContext";

export default function Card({ title, skills, description ,id}) {
  // handle navigate
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const handleSeeMore = () => {
    if (!user) {
      navigate('/login');
    }else{
      navigate(`/jobs/${id}`);
    }
  };
  return (
      <Paper
        elevation={3}
        sx={{
          padding: 2,
          width: 350,
          height: 200,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        {/* Title */}
        <Typography variant="h8" sx={{ fontWeight: "bold", marginBottom: 1 }}>
          {title ? title : "No title"}
        </Typography>

        {/* List of Requirements */}
        <Box
          sx={{ display: "flex", flexWrap: "wrap", gap: 1, marginBottom: 2 }}
        >
          {skills ? (
            skills
              .slice(0, 4)
              .map((skill, index) => (
                <Chip
                  key={index}
                  label={skill}
                  sx={{ backgroundColor: "red", color: "white" ,fontSize: "0.75rem"}}
                />
              ))
          ) : (
            <Chip
              label={"No skill listed"}
              sx={{ backgroundColor: "red", color: "white" }}
            />
          )}
        </Box>

        {/* Description */}
        <Typography variant="body2" sx={{ marginBottom: 10 }}>
          {description ? description : "No description"}
        </Typography>

        {/* See More Button */}
        <Button
          variant="contained"
          sx={{ position: "absolute", bottom: 8, left: 140}}
          disabled={skills ? false : true}
          onClick={handleSeeMore}
        >
          See More
        </Button>
      </Paper>
  );
}
