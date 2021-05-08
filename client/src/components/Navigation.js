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

// TODO: Pass props into Pagination
// TODO: Move pagination to bottom of page

const Navigation = (props) => {
  const classes = useStyles();

  const prevPage = () => {
    if (props.pageNumber > 1) {
      props.setPageNumber(props.pageNumber - 1);
    }
  };

  const nextPage = () => {
    if (props.pageNumber < props.maxPageNumber) {
      props.setPageNumber(props.pageNumber + 1);
    }
  };

  const firstPage = () => {
    props.setPageNumber(1);
  };

  const lastPage = () => {
    props.setPageNumber(props.maxPageNumber);
  };

  return (
    <div>
      <Pagination className={classes.navBar}>
        <Pagination.First onClick={firstPage} />
        <Pagination.Prev onClick={prevPage} />

        <Pagination.Item>{props.pageNumber}</Pagination.Item>

        <Pagination.Next onClick={nextPage} />
        <Pagination.Last onClick={lastPage} />
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
