import React, { useState, useEffect } from "react";
import validate from "validate.js";
import DateFnsUtils from '@date-io/date-fns';
import { Button } from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";



const RestaurationMachine = () => {
  const [formState, setFormState] = useState(Date());


  const handleChange = event => {

    setFormState(event);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div
        style={{
          padding: "50px"
        }}
        className="dataSource"
      >
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Date restauration"
          format="MM/dd/yyyy"
          name="formState"
          onChange={handleChange}
          value={formState}
          KeyboardButtonProps={{
            "aria-label": "change date"
          }}
        />
        <Button
          //className={classes.signUpButton}
          color="primary"
          // disabled={!formState.isValid}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
        >
          Restaure Machine
        </Button>
      </div>
    </MuiPickersUtilsProvider>
  );
};
export default RestaurationMachine;
