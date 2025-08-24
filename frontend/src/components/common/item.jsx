
import React from "react";
import { Link } from "react-router-dom";
import { Typography, Box, Button, Stack, Chip } from "@mui/material";

function Item({ poll }) {
  return (
    <Box sx={{ p: 1 }}>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: 'primary.main' }}>
        {poll.description.slice(0, 100)}
        {poll.description.length > 100 && "..."}
      </Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" justifyContent="space-between">
        <Box>
          <Chip label={`Created by ${poll.username}`} color="info" size="small" sx={{ mr: 1, mb: { xs: 1, sm: 0 } }} />
          <Chip label={`Status: ${poll.time_left}`} color={poll.ended ? "error" : "success"} size="small" />
        </Box>
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to={`/polls/${poll.id}`}
          sx={{ fontWeight: 600, borderRadius: 2, boxShadow: 2, transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.07)' } }}
        >
          View
        </Button>
      </Stack>
    </Box>
  );
}

export default Item;
