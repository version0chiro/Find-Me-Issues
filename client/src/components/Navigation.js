import React from 'react';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Pagination from 'react-bootstrap/Pagination';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  navBar: {
    justifyContent: 'center',
    '& a': {
      color: 'black',
    },
  },
});

// TODO: customize pagination component
// TODO: Pass props into Pagination
// TODO: Move pagination to bottom of page

const Navigation = (props) => {
  const classes = useStyles();

  return (
    <div>
      <Pagination className={classes.navBar}>
        <Pagination.First />
        <Pagination.Prev />
        <Pagination.Item>{1}</Pagination.Item>
        <Pagination.Item>{2}</Pagination.Item>
        <Pagination.Item>{3}</Pagination.Item>
        <Pagination.Item>{4}</Pagination.Item>
        <Pagination.Item>{5}</Pagination.Item>

        <Pagination.Next />
        <Pagination.Last />
      </Pagination>

      <ArrowBackIcon
        onClick={() => {
          if (props.pageNumber > 1) {
            props.setPageNumber(props.pageNumber - 1);
          }
        }}
      />
      {props.pageNumber}
      <ArrowForwardIcon
        onClick={() => {
          if (props.pageNumber < props.maxPageNumber) {
            props.setPageNumber(props.pageNumber + 1);
          }
        }}
      />
    </div>
  );
};

export default Navigation;
