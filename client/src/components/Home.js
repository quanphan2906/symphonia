import React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import { useRouter } from "next/router";

function Home() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/auth/signup");
  };
  return (
    <Container
      maxWidth="md"
      style={{
        height: "calc(100vh - 64px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <Typography
        variant="h1"
        style={{
          fontSize: "4rem",
          fontWeight: "bold",
          marginBottom: "2rem",
          color: "#333",
          textShadow: "2px 2px 4px #ccc",
        }}
      >
        Welcome to Connectify
      </Typography>
      <Typography
        variant="body1"
        style={{ fontSize: "1.5rem", marginBottom: "2rem", color: "#666" }}
      >
        This is a music app where you can create and join groups, add and remove
        songs, and filter songs by tags.
      </Typography>
      <Grid
        container
        spacing={2}
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={handleClick}
            startIcon={
              <MusicNoteIcon
                style={{ fontSize: "3rem", marginRight: "1rem" }}
              />
            }
          >
            Create Group
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleClick}
            startIcon={
              <MusicNoteIcon
                style={{ fontSize: "3rem", marginRight: "1rem" }}
              />
            }
          >
            Join Group
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;
