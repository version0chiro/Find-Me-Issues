import React from 'react';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const Navigation=(props)=>{
    return (
        <div>
            <ArrowBackIcon onClick={()=>{if(props.pageNumber>1){props.setPageNumber(props.pageNumber-1)}}}/>
            {props.pageNumber}
            <ArrowForwardIcon onClick={()=>{if(props.pageNumber<props.maxPageNumber){props.setPageNumber(props.pageNumber+1)}}}/>
        </div>
    )
}

export default Navigation;