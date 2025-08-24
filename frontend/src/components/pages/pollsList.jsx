
import React, { useContext, useEffect, useState } from "react";
import pollService from "../../services/pollService";
import { Link } from "react-router-dom";
import AuthContext from "../../context/authContext";
import Item from "../common/item";
import Pagination from "../common/pagination";
import SearchField from "../common/searchField";
import ListGroup from "../common/listGroup";
import Loading from "../common/loading";
import { Card, CardContent, Typography, Grid, Button, Box, Fade, Drawer, IconButton, Chip, Stack } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';


function PollsList(props) {
  // Hamburger drawer state (must be at the top before any return)
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useContext(AuthContext);
  const [selectedState, setSelectedState] = useState("");
  const [sortingQuery, setSortingQuery] = useState("");

  const states = [
    { title: "All Polls", value: "" },
    { title: "Ongoing", value: "active" },
    { title: "Closing Soon (1hr)", value: "hour" },
    { title: "Closing Today (24hr)", value: "day" },
    { title: "Closing This Week", value: "week" },
    { title: "Closed", value: "ended" },
  ];

  const sorting = [
    { title: "Sort By", value: "" },
    { title: "Least Time Left", value: "inc" },
    { title: "Most Time Left", value: "dec" },
  ];

  useEffect(() => {
    async function getPolls() {
      const { data } = await pollService.getPolls();
      setPolls(data);
      if (loading) setLoading(false);
    }

    if (loading) {
      getPolls();
    }

    const interval = setInterval(getPolls, 30 * 1000);

    return () => clearInterval(interval);
  }, [polls, loading]);

  if (loading) return <Loading height="60" />;

  let filteredData = polls;
  if (searchQuery) {
    filteredData = filteredData.filter(
      (poll) =>
        poll.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        poll.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  if (selectedState === "active") {
    filteredData = filteredData.filter((poll) => !poll.ended);
  }
  if (selectedState === "ended") {
    filteredData = filteredData.filter((poll) => poll.ended);
  }
  if (selectedState === "week") {
    filteredData = filteredData.filter((poll) => {
      if (poll.ended) return false;
      if (
        poll.time_left.includes("day") &&
        Number(poll.time_left.slice(0, 2)) >= 7
      )
        return false;
      return true;
    });
  }
  if (selectedState === "day") {
    filteredData = filteredData.filter(
      (poll) => !poll.ended && !poll.time_left.includes("day")
    );
  }
  if (selectedState === "hour") {
    filteredData = filteredData.filter(
      (poll) =>
        !poll.ended &&
        !poll.time_left.includes("hour") &&
        !poll.time_left.includes("day")
    );
  }

  const priority = ({ ended, time_left }) => {
    if (ended) return 0;
    if (time_left.includes("day")) return 1;
    if (time_left.includes("hour")) return 2;
    if (time_left.includes("minutes")) return 3;
    return 4;
  };

  let sortedData = filteredData;

  if (sortingQuery == "inc")
    filteredData.sort((poll1, poll2) => {
      if (priority(poll1) != priority(poll2))
        return priority(poll1) < priority(poll2) ? 1 : -1;
      const poll1Time = Number(poll1.time_left.slice(0, 2)),
        poll2Time = Number(poll2.time_left.slice(0, 2));
      if (poll1Time != poll2Time) return poll1Time > poll2Time ? 1 : -1;
      return 0;
    });
  if (sortingQuery == "dec")
    filteredData.sort((poll1, poll2) => {
      if (priority(poll1) != priority(poll2))
        return priority(poll1) > priority(poll2) ? 1 : -1;
      const poll1Time = Number(poll1.time_left.slice(0, 2)),
        poll2Time = Number(poll2.time_left.slice(0, 2));
      if (poll1Time != poll2Time) return poll1Time < poll2Time ? 1 : -1;
      return 0;
    });

  const startIndex = (currentPage - 1) * pageSize,
    endIndex = currentPage * pageSize;
  const paginatedData =
    endIndex < filteredData.length
      ? filteredData.slice(startIndex, endIndex)
      : filteredData.slice(startIndex);

  const pageData = paginatedData;


  return (
    <Fade in timeout={600}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={9} sm={7}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
              <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" sx={{ width: '100%' }}>
                <SearchField
                  searchQuery={searchQuery}
                  handleChange={({ currentTarget: input }) => {
                    setSearchQuery(input.value);
                    setCurrentPage(1);
                  }}
                  label="Search Polls or Users"
                />
                {user && user.user_id && (
                  <Button
                    variant="contained"
                    color="secondary"
                    component={Link}
                    to="/create-poll"
                    sx={{ fontWeight: 700, borderRadius: 3, boxShadow: 3, px: 3, py: 1, fontSize: '1.1rem', background: 'linear-gradient(90deg,#36a2eb,#7f53ac)', transition: 'background 0.3s' }}
                  >
                    Create Poll
                  </Button>
                )}
                <IconButton color="primary" onClick={() => setDrawerOpen(true)} sx={{ ml: 1 }}>
                  <MenuIcon fontSize="large" />
                </IconButton>
              </Stack>
            </Box>
            <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
              <Box sx={{ width: 270, p: 3, background: 'linear-gradient(135deg,#f5f7fa,#c3cfe2)' }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, color: 'primary.main' }}>Filter Polls</Typography>
                <Stack spacing={2}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Status</Typography>
                  {states.map((item) => (
                    <Chip
                      key={item.value}
                      label={item.title}
                      color={selectedState === item.value ? 'primary' : 'default'}
                      onClick={() => {
                        if (item.value === "ended") setSortingQuery("");
                        setSelectedState(item.value);
                        setCurrentPage(1);
                        setDrawerOpen(false);
                      }}
                      sx={{ fontWeight: 500, fontSize: '1rem', mb: 0.5, cursor: 'pointer' }}
                    />
                  ))}
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mt: 2 }}>Sort</Typography>
                  {sorting.map((item) => (
                    <Chip
                      key={item.value}
                      label={item.title}
                      color={sortingQuery === item.value ? 'secondary' : 'default'}
                      onClick={() => {
                        setSortingQuery(item.value);
                        setCurrentPage(1);
                        if (selectedState === "ended") setSelectedState("");
                        setDrawerOpen(false);
                      }}
                      sx={{ fontWeight: 500, fontSize: '1rem', mb: 0.5, cursor: 'pointer' }}
                    />
                  ))}
                </Stack>
              </Box>
            </Drawer>
            <Grid container spacing={2}>
              {pageData.map((poll) => (
                <Grid item xs={12} key={poll.id}>
                  <Card elevation={3} sx={{ borderRadius: 3, transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.01)', boxShadow: 6 }, background: 'linear-gradient(90deg,#f5f7fa,#c3cfe2)' }}>
                    <CardContent>
                      <Item poll={poll} />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Box sx={{ mt: 3 }}>
              <Pagination
                itemsCount={filteredData.length}
                pageSize={pageSize}
                onPageChange={(page) => setCurrentPage(page)}
                currentPage={currentPage}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Fade>
  );
}

export default PollsList;
