import React from 'react';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Pagination from 'react-bootstrap/Pagination';

// TODO: Center Pagination
// TODO: Pass props into Pagination
// TODO: Move pagination to bottom of page

const Navigation = (props) => {
  return (
    <div>
      <Pagination>
        <Pagination.First />
        <Pagination.Prev />
        <Pagination.Item>{1}</Pagination.Item>
        <Pagination.Ellipsis />

        <Pagination.Item>{10}</Pagination.Item>
        <Pagination.Item>{11}</Pagination.Item>
        <Pagination.Item active>{12}</Pagination.Item>
        <Pagination.Item>{13}</Pagination.Item>
        <Pagination.Item disabled>{14}</Pagination.Item>

        <Pagination.Ellipsis />
        <Pagination.Item>{20}</Pagination.Item>
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
