import React, { useContext } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import { makeStyles } from '@material-ui/core/styles';
//Context
import {ThemeContext} from '../Context/themeContext'

const useStyles = makeStyles({
  navBar: {
    margin: '0px',
    paddingTop: '25px',
    paddingBottom: '10px',
    justifyContent: 'center',
    '& a': {
      color: 'black',
    }
  },
  pageCountElement: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    fontSize: '0.8rem',
    textTransform: 'uppercase',
  },
  pageCountInnerElement: {
    whiteSpace: 'pre-wrap',
    color: '#0d6efd',
  }
});

const Navigation = (props) => {
  console.log("Hello World")
  console.log("%o", props);
  const classes = useStyles()
  const {theme} = useContext(ThemeContext)

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
    <div style={{ backgroundColor: theme.bg, color: theme.color, display: props.hidePagination ? 'none' : 'block'}}>
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
      <b 
        className={classes.pageCountElement} 
        style={{ color: "#0dcaf0 !important", backgroundColor: theme.bg }}
      > page
        <span className={classes.pageCountInnerElement}> {props.pageNumber} </span>
        of
        <span className={classes.pageCountInnerElement}> {props.maxPageNumber} </span> </b>
    </div>
  );
};

export default Navigation;
