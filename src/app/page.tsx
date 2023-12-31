import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import MediaCard from '@/components/MediaCard';

export default function HomePage() {
  return (
    <Box
      sx={{
        display: 'flex',
      }}
    >
      <Box>
        <Alert severity="info" sx={{ mt: 2, mb: 5 }}>
          <AlertTitle>Hello 👋</AlertTitle>
          This app is miles's web3 tools.
        </Alert>

        <Grid container rowSpacing={3} columnSpacing={3}>
          <Grid xs={6}>
            <MediaCard
              heading="KZG"
              text="Batch Check KZG Poap Eligibility."
              href="/kzg"
              imgUrl='/imgs/kzg-ceremony-contributor.png'
            />
          </Grid>
          {/* <Grid xs={6}>
            <MediaCard
              heading="Tasks"
              text="Current Task List"
              href="/tasks"
            />
          </Grid> */}
          {/* <Grid xs={6}>
            <MediaCard
              heading="RGB"
              text="An RGB color space is any additive color space based on the RGB color model. RGB color spaces are commonly found describing the input signal to display devices such as television screens and computer monitors."
            />
          </Grid>
          <Grid xs={6}>
            <MediaCard
              heading="CIELAB"
              text="The CIELAB color space, also referred to as L*a*b*, was intended as a perceptually uniform space, where a given numerical change corresponds to a similar perceived change in color."
            />
          </Grid> */}
        </Grid>
      </Box>
    </Box>
  );
}
