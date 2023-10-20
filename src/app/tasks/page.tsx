"use client";
import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  Grid,
  List,
  ListItemButton,
  ListItemText,
  styled,
} from "@mui/material";

function generate(element: React.ReactElement) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    })
  );
}

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[4],
}));

export default function TasksPage() {

  const connect = async () => {
    const accounts = await (window as any).ethereum.request({
      method: 'eth_requestAccounts',
    });
    console.log(accounts);
  }

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
              Text only
            </Typography>
            <Demo>
              <List component="nav">
                <ListItemButton onClick={() => connect()}>
                  <ListItemText primary="Connect" />
                </ListItemButton>
                <ListItemButton>
                  <ListItemText primary="Bridge Eth from Arb to Op" />
                </ListItemButton>
                {/* {generate(
                  <ListItemButton>
                    <ListItemText primary="Single-line item" />
                  </ListItemButton>
                )} */}
              </List>
            </Demo>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
              Icon with text
            </Typography>
            <Demo>
              <List>
                {generate(
                  <ListItemButton>
                    <ListItemText primary="Single-line item" />
                  </ListItemButton>
                )}
              </List>
            </Demo>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
              Avatar with text
            </Typography>
            <Demo>
              <List>
                {generate(
                  <ListItemButton>
                    <ListItemText primary="Single-line item" />
                  </ListItemButton>
                )}
              </List>
            </Demo>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
              Avatar with text and icon
            </Typography>
            <Demo>
              <List>
                {generate(
                  <ListItemButton>
                    <ListItemText primary="Single-line item" />
                  </ListItemButton>
                )}
              </List>
            </Demo>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
