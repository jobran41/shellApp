import React, { useState, useEffect } from "react";
import {
  Grid,
  Button,
  IconButton,
  TextField,
  Link,
  FormHelperText,
  Checkbox,
  Typography
} from "@material-ui/core";
import validate from "validate.js";
import axios from 'axios';


const schema = {
  nameMachine: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 32
    }
  },
  os: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 32
    }
  },
  cpu: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 64
    }
  },
  ram: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 128
    }
  },
  disque: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 32
    }
  },
  adressIp: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 32
    }
  },
  netMask: {
    presence: { allowEmpty: false, message: "is required" },
    email: true,
    length: {
      maximum: 64
    }
  },
  getWay: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 128
    }
  },
  dns: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 32
    }
  },
  memory: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 32
    }
  },
  exsiDestination: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 32
    }
  },
  datasourceDestination: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 32
    }
  }
};

const CreateMachine = props => {
  const { history } = props;

  //const classes = useStyles();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  async function fetchMyAPI() {
    let response =await  axios('/createFile', { headers: { Authorization: `Bearer ${localStorage.token}` } })
  }

  useEffect(() => {
    fetchMyAPI();
  }, []);

  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === "checkbox"
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };
const createFile = async ()=>{
  await  axios(
    {
      method: 'post',
      url: '/writeFile',
      data: {
        user: 'ahmed',
        password: 'dk',
        ...formState.values
      }, 
      headers: { Authorization: `Bearer ${localStorage.token}` } })
}
  return (
    <div className="createMachine">
      <div
        style={{
          display: "flex",
          padding: "50px"
        }}
        className="paramVm"
      >
        <div
          style={{
            width: "30%"
          }}
          className="paramVmLable"
        >
          Parametre Vm
        </div>
        <div className="paramVmTextField">
          <TextField
            style={{
              marginBottom: "10px"
            }}
            fullWidth
            label="Name of Machine"
            name="nameMachine"
            onChange={handleChange}
            type="text"
            value={formState.values.nameMachine || ""}
            variant="outlined"
          />
          <TextField
            style={{
              marginBottom: "10px"
            }}
            fullWidth
            label="os"
            name="os"
            onChange={handleChange}
            type="text"
            value={formState.values.os || ""}
            variant="outlined"
          />
          <TextField
            style={{
              marginBottom: "10px"
            }}
            fullWidth
            label="cpu"
            name="cpu"
            onChange={handleChange}
            type="text"
            value={formState.values.cpu || ""}
            variant="outlined"
          />
          <TextField
            style={{
              marginBottom: "10px"
            }}
            fullWidth
            label="Ram"
            name="ram"
            onChange={handleChange}
            type="text"
            value={formState.values.ram || ""}
            variant="outlined"
          />
          <TextField
            style={{
              marginBottom: "10px"
            }}
            fullWidth
            label="Disque"
            name="disque"
            onChange={handleChange}
            type="text"
            value={formState.values.disque || ""}
            variant="outlined"
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          padding: "50px"
        }}
        className="networkVm"
      >
        <div
          style={{
            width: "25%"
          }}
          className="networkLable"
        >
          Network Vm
        </div>
        <div className="paramVmTextField">
          <TextField
            style={{
              marginBottom: "10px"
            }}
            fullWidth
            label="Address Ip"
            name="addressIp"
            onChange={handleChange}
            type="text"
            value={formState.values.addressIp || ""}
            variant="outlined"
          />
          <TextField
            style={{
              marginBottom: "10px"
            }}
            fullWidth
            label="netMask"
            name="netMask"
            onChange={handleChange}
            type="text"
            value={formState.values.netMask || ""}
            variant="outlined"
          />
          <TextField
            style={{
              marginBottom: "10px"
            }}
            fullWidth
            label="getWay"
            name="getWay"
            onChange={handleChange}
            type="text"
            value={formState.values.getWay || ""}
            variant="outlined"
          />
          <TextField
            style={{
              marginBottom: "10px"
            }}
            fullWidth
            label="dns"
            name="dns"
            onChange={handleChange}
            type="text"
            value={formState.values.dns || ""}
            variant="outlined"
          />
          <TextField
            style={{
              marginBottom: "10px"
            }}
            fullWidth
            label="memory"
            name="memory"
            onChange={handleChange}
            type="text"
            value={formState.values.memory || ""}
            variant="outlined"
          />

        </div>
      </div>
      <div style={{
          padding:"50px"
      }} className="dataSource">
        <TextField
          style={{
            marginBottom: "10px"
          }}
          fullWidth
          label="Exsi Destination"
          name="exsiDestination"
          onChange={handleChange}
          type="text"
          value={formState.values.exsiDestination || ""}
          variant="outlined"
        />
        <TextField
          style={{
            marginBottom: "10px"
          }}
          fullWidth
          label="DataSource destination"
          name="datasourceDestination"
          onChange={handleChange}
          type="text"
          value={formState.values.datasourceDestination || ""}
          variant="outlined"
        />
      </div>
      <Button
        //className={classes.signUpButton}
        color="primary"
       // disabled={!formState.isValid}
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        onClick={createFile}
      >
        Create Machine
      </Button>
    </div>
  );
};
export default CreateMachine;
