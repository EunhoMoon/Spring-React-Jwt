import * as React from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import StaticDatePicker from "@mui/lab/StaticDatePicker";
import dayjs from "dayjs";

export default function Calendar() {
  const [value, setValue] = React.useState(
    dayjs(new Date()).format("YYYY-MM-DD")
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <StaticDatePicker
        displayStaticWrapperAs="desktop"
        value={value}
        inputFormat={"yyyy-MM-dd"}
        onChange={(newValue) => {
          const dateFormat = dayjs(newValue).format("YYYY-MM-DD");
          setValue(dateFormat);
          console.log(value);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
