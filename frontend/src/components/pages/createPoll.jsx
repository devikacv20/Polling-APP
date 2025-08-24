
import React, { Component } from "react";
import pollService from "../../services/pollService";
import Form from "../common/form";
import Joi from "joi";
import AuthContext from "../../context/authContext";
import { toast } from "react-toastify";
import Loading from "../common/loading";
import { Card, CardContent, Typography, Stack, Button, Box, Fade } from "@mui/material";

class CreatePoll extends Form {
  state = {
    data: {
      description: "",
      liveResults: false,
      timePeriod: 1,
      option1: "",
      option2: "",
    },
    optionCount: 2,
    optionsUpdated: false,
    errors: {},
    loading: false,
  };

  maxOptionCount = 8;

  static contextType = AuthContext;

  schema = {
    description: Joi.string().required().max(100).label("Description"),
    liveResults: Joi.boolean().label("Live Results"),
    timePeriod: Joi.number().required().min(1).max(30).label("Time Period"),
    option1: Joi.string().required().max(100).label("Option 1"),
    option2: Joi.string().required().max(100).label("Option 2"),
  };

  validate = (test = false) => {
    if (this.state.optionsUpdated && test == false)
      return this.state.errors != null && this.state.errors != {}
        ? { ...this.state.errors }
        : null;

    const { error } = Joi.object(this.schema).validate(
      { ...this.state.data },
      { abortEarly: false }
    );

    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  doSubmit = async () => {
    try {
      this.setState({ loading: true });
      const { description, liveResults, timePeriod } = this.state.data;
      let options = [];
      for (let key in this.state.data) {
        if (key.slice(0, 6) == "option")
          options.push({ description: this.state.data[key] });
      }
      const { data } = await pollService.createPoll(
        this.context.user.user_id,
        description,
        liveResults,
        timePeriod,
        options
      );
      window.location = `/polls/${data.id}`;
    } catch (ex) {
      if (ex.response && ex.response.status === 401) {
        this.context.logout();
        toast.error("Session expired");
      } else {
        toast.error("An unexpected errror occured!");
      }
      this.setState({ loading: false });
    }
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors, optionsUpdated: false });
  };

  addOption = () => {
    const { optionCount } = this.state;
    if (optionCount == this.maxOptionCount) return;
    let { data } = this.state;
    data = { ...data, [`option${optionCount + 1}`]: "" };
    this.schema = {
      ...this.schema,
      [`option${optionCount + 1}`]: Joi.string()
        .required()
        .max(100)
        .label(`Option ${optionCount + 1}`),
    };
    this.setState({
      data,
      optionCount: optionCount + 1,
      optionsUpdated: true,
    });
  };

  removeOption = () => {
    const { optionCount } = this.state;
    if (optionCount == 2) return;
    let { data, errors } = this.state;
    delete data[`option${optionCount}`];
    delete this.schema[`option${optionCount}`];
    delete errors[`option${optionCount}`];
    this.setState({
      data,
      optionCount: optionCount - 1,
      errors,
    });

    const e = this.validate(true);
    if (!e || e == {}) {
      this.setState({ optionsUpdated: false });
    } else this.setState({ optionsUpdated: true });
  };

  render() {
    if (this.state.loading) return <Loading height="60" />;

    return (
      <Fade in timeout={600}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh' }}>
          <Card elevation={6} sx={{ borderRadius: 4, minWidth: 400, maxWidth: 600, width: '100%', background: 'linear-gradient(135deg,#f5f7fa,#c3cfe2)' }}>
            <CardContent>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, color: 'primary.main', textAlign: 'center', letterSpacing: 1 }}>
                Create a New Poll
              </Typography>
              <form onSubmit={this.handleSubmit} autoComplete="off">
                <Stack spacing={2}>
                  {this.renderInput("description", "Poll Description")}
                  {this.renderCheck("liveResults", "Show Live Results")}
                  {this.renderInput("timePeriod", "Duration (days)", "number")}
                  <Stack direction="row" spacing={2} flexWrap="wrap">
                    {[...Array(this.state.optionCount).keys()].map((num) => (
                      <Box key={num} sx={{ flex: 1, minWidth: 180 }}>
                        {this.renderInput(`option${num + 1}`, `Option ${num + 1}`)}
                      </Box>
                    ))}
                  </Stack>
                  <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
                    <Box>
                      <Button
                        variant="outlined"
                        color="primary"
                        disabled={this.state.optionCount == this.maxOptionCount}
                        onClick={this.addOption}
                        sx={{ mr: 1, fontWeight: 600 }}
                      >
                        Add Option
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        disabled={this.state.optionCount == 2}
                        onClick={this.removeOption}
                        sx={{ fontWeight: 600 }}
                      >
                        Remove Option
                      </Button>
                    </Box>
                    <Button
                      variant="contained"
                      color="success"
                      type="submit"
                      disabled={this.validate()}
                      sx={{ fontWeight: 700, px: 4, py: 1, borderRadius: 2, boxShadow: 2 }}
                    >
                      Submit
                    </Button>
                  </Stack>
                </Stack>
              </form>
            </CardContent>
          </Card>
        </Box>
      </Fade>
    );
  }
}

export default CreatePoll;
