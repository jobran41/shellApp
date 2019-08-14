import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import Done from '@material-ui/icons/Done';
import Close from '@material-ui/icons/Close';
import Info from '@material-ui/icons/Info';


import {
  Alert,
  TotalUsers,
  TasksProgress,
  TotalProfit,
  LatestSales,
  UsersByDevice,
  LatestProducts,
  LatestOrders
} from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Dashboard = () => {
  const classes = useStyles();
  const [data, setData] = useState({ hits: [] });

  async function fetchMyAPI() {
    let response =await  axios('/files', { headers: { Authorization: `Bearer ${localStorage.token}` } })
    setData(response.data)
  }

  useEffect(() => {
    fetchMyAPI();
  }, []);

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          lg={4}
          sm={6}
          xl={3}
          xs={12}
        >
          <Alert icon={<Close  />} status={"Echec"} count={0} />
       </Grid>
        <Grid
          item
          lg={4}
          sm={6}
          xl={3}
          xs={12}
        >
        <Alert icon={<Done  />} status={"Success"} count={2} />
        </Grid>
        <Grid
          item
          lg={4}
          sm={6}
          xl={3}
          xs={12}
        >
        <Alert icon={<Info  />} status={"dange"} count={2} />
        </Grid>
        <Grid
          item
          lg={4}
          sm={6}
          xl={3}
          xs={12}
        >
          <TasksProgress value={75} name="Capaciter Esxi" />
        </Grid>
        <Grid
          item
          lg={4}
          sm={6}
          xl={3}
          xs={12}
        >
          <TasksProgress value={75} name="Capaciter Datasource" />
        </Grid>
        <Grid
          item
          lg={12}
          md={12}
          xl={9}
          xs={12}
        >
         {data.length>0 && <LatestOrders orders={data} />}
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
