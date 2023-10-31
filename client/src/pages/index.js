import React, { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import Header from "@/components/Header";
import GroupList from "@/components/groups/GroupList";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import MusicNoteIcon from "@mui/icons-material/MusicNote";

function HomePage() {
  const { user } = useContext(UserContext);

  return (
    <div>
      <Header />
      <Container
        maxWidth="md"
        style={{
          height: "100vh",
          backgroundImage: "linear-gradient(to bottom, #f5f5f5, #fff)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h1" style={{ fontSize: "4rem", fontWeight: "bold", marginBottom: "2rem", color: "#333", textShadow: "2px 2px 4px #ccc" }}>
          Welcome to Connectify
        </Typography>
        <Typography variant="body1" style={{ fontSize: "1.5rem", marginBottom: "2rem", color: "#666" }}>
          This is a music app where you can create and join groups, add and remove songs, and filter songs by tags.
        </Typography>
        <Grid container spacing={2}>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              style={{ margin: "8px" }}
              startIcon={<MusicNoteIcon style={{ fontSize: "3rem", marginRight: "1rem" }} />}
            >
              Create Group
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              style={{ margin: "8px" }}
              startIcon={<MusicNoteIcon style={{ fontSize: "3rem", marginRight: "1rem" }} />}
            >
              Join Group
            </Button>
          </Grid>
        </Grid>
        {user && (
          <div style={{ display: "flex" }}>
            <GroupList />
          </div>
        )}
      </Container>
    </div>
  );
}

export default HomePage;