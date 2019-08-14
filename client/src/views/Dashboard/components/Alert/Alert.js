import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 700
  },
  avatar: {
    backgroundColor: theme.palette.error.main,
    height: 56,
    width: 56
  },
  icon: {
    height: 32,
    width: 32
  },
  difference: {
    marginTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'center'
  },
  differenceIcon: {
    color: theme.palette.error.dark
  },
  differenceValue: {
    color: theme.palette.error.dark,
    marginRight: theme.spacing(1)
  }
}));

const Alert = props => {
  const {status,count,icon, className, ...rest } = props;

  const classes = useStyles();
const color=status==="Echec" 

const switechColor=(ec)=>{
switch (ec) {
  case "Echec":
    return "red"
    break;
    case "Success":
      return "green"
      break;
      case "dange":
        return "orange"
        break;
  default:
    break;
}
}
  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
      style={{
        border:`1px solid ${switechColor(status)}`
      }}
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
        >
          <Grid item>
            <Typography variant="h3"> {count}</Typography>
          </Grid>
          <Grid item>
            <Avatar style={{
              backgroundColor:switechColor(status)
            }} className={classes.avatar}>
              {icon}
              
            </Avatar>
          </Grid>
        </Grid>
        <div className={classes.difference}>
          <Typography
            className={classes.caption}
            variant="caption"
          >
            {status}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

Alert.propTypes = {
  className: PropTypes.string
};

export default Alert;
