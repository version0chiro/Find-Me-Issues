import React from 'react';
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

const Navigation = (props) => {
  const classes = useStyles();

  let paginationItems = [];

  // edge case for beginning pages active states
  if (props.pageNumber <= 3) {
    for (let pageNumber = 1; pageNumber <= 5; pageNumber++) {
      paginationItems.push(
        <Pagination.Item
          key={pageNumber}
          active={pageNumber === props.pageNumber}
          onClick={() => {
            props.setPageNumber(pageNumber);
          }}
        >
          {pageNumber}
        </Pagination.Item>,
      );
    }
  }
  // edge case for end pages active states
  else if (props.pageNumber > props.maxPageNumber - 2) {
    for (
      let pageNumber = props.maxPageNumber - 4;
      pageNumber <= props.maxPageNumber;
      pageNumber++
    ) {
      paginationItems.push(
        <Pagination.Item
          key={pageNumber}
          active={pageNumber === props.pageNumber}
          onClick={() => {
            props.setPageNumber(pageNumber);
          }}
        >
          {pageNumber}
        </Pagination.Item>,
      );
    }
  }
  // covers rest of page active states
  else if (props.pageNumber <= props.maxPageNumber - 2) {
    for (
      let pageNumber = props.pageNumber - 2;
      pageNumber <= props.pageNumber + 2;
      pageNumber++
    ) {
      paginationItems.push(
        <Pagination.Item
          key={pageNumber}
          active={pageNumber === props.pageNumber}
          onClick={() => {
            props.setPageNumber(pageNumber);
          }}
        >
          {pageNumber}
        </Pagination.Item>,
      );
    }
  }

  return (
    <div>
      <Pagination className={classes.navBar}>
        <Pagination.First
          onClick={() => {
            props.setPageNumber(1);
          }}
        />
        <Pagination.Prev
          onClick={() => {
            if (props.pageNumber > 1) {
              props.setPageNumber(props.pageNumber - 1);
            }
          }}
        />

        {paginationItems}

        <Pagination.Next
          onClick={() => {
            if (props.pageNumber < props.maxPageNumber) {
              props.setPageNumber(props.pageNumber + 1);
            }
          }}
        />
        <Pagination.Last
          onClick={() => {
            props.setPageNumber(props.maxPageNumber);
          }}
        />
      </Pagination>
    </div>
  );
};

export default Navigation;
