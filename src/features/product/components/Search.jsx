import { yupResolver } from "@hookform/resolvers/yup";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton, InputBase, Paper } from "@mui/material";
import _ from "lodash";
import PropTypes from "prop-types";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

Search.propTypes = {
  onSubmit: PropTypes.func,
};

const debouncedSearch = _.debounce((query, onSubmit) => {
  console.log("Searching for:", query);
  if (onSubmit) {
    onSubmit(query);
  }
}, 300);

function Search({ onSubmit }) {
  const schema = yup.object().shape({
    searchValue: yup.string(),
  });

  const form = useForm({
    defaultValues: {
      searchValue: "",
    },
    resolver: yupResolver(schema),
  });

  const handleOnChange = (event) => {
    const value = event.target.value;
    form.setValue("searchValue", value);
    debouncedSearch(value, onSubmit);
  };

  const handleOnSubmit = async (values) => {
    const { searchValue } = values;
    if (onSubmit) {
      await onSubmit(searchValue);
    }
    form.reset();
  };

  const { isSubmitting } = form.formState;

  return (
    <Paper
      component="form"
      onSubmit={form.handleSubmit(handleOnSubmit)}
      sx={{ mt: 3 }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search by product name"
        inputProps={{
          "aria-label": "search google maps",
          autoComplete: "on",
          maxLength: 32,
        }}
        id="searchValue"
        name="searchValue"
        {...form.register("searchValue")}
        error={!!form.formState.errors.searchValue}
        helperText={form.formState.errors.searchValue?.message}
        onChange={handleOnChange}
      />
      <IconButton
        type="submit"
        sx={{ p: "10px" }}
        aria-label="search"
        disabled={isSubmitting}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}

export default Search;
