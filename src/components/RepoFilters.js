import React, { useCallback, useReducer, useState } from 'react'
import DropdownToggle from 'react-bootstrap/esm/DropdownToggle'
import { Collapse } from 'react-collapse'
import { Button, FormControl, InputGroup } from 'react-bootstrap'

const RepoFilters = ({ reducedState, setReducedState }) => {
  const [isButtonCollapseOpen, setIsButtonCollapseOpen] = useState(false)

  const onClick = useCallback(
    () => setIsButtonCollapseOpen(!isButtonCollapseOpen),
    [isButtonCollapseOpen]
  )

  const onApplyClicked = () => {
    setReducedState(state)
    console.log(reducedState)
  }

  const initFilterState = {
    minForks: '',
    maxForks: '',
    minStars: '',
    maxStars: ''
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case 'MIN_FORKS_ONLY':
        return {
          ...state,
          minForks: action.payload
        }
      case 'MAX_FORKS_ONLY':
        return {
          ...state,
          maxForks: action.payload
        }
      case 'MIN_STARS_ONLY':
        return {
          ...state,
          minStars: action.payload
        }
      case 'MAX_STARS_ONLY':
        return {
          ...state,
          maxStars: action.payload
        }
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(reducer, initFilterState)

  return (
    <div
      style={{
        marginTop: '20px'
      }}
    >
      <DropdownToggle
        aria-expanded={isButtonCollapseOpen}
        onClick={onClick}
        type='button'
      >
        Filters
      </DropdownToggle>
      <Collapse isOpened={isButtonCollapseOpen}>
        <div className='blob'>
          <div
            id='forksFilter'
            style={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'center',
              margin: '20px',
              gap: '20px'
            }}
          >
            <h6>Number of Forks</h6>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '20px'
              }}
            >
              <InputGroup>
                <FormControl
                  onChange={e => {
                    dispatch({
                      type: 'MIN_FORKS_ONLY',
                      payload: e.target.value
                    })
                  }}
                  type='number'
                  name='minimumForks'
                  min='1'
                  placeholder='Minimum Forks'
                  id='minimumForks'
                  aria-label='Default'
                  aria-describedby='inputGroup-sizing-default'
                />
              </InputGroup>
              <InputGroup>
                <FormControl
                  onChange={e => {
                    dispatch({
                      type: 'MAX_FORKS_ONLY',
                      payload: e.target.value
                    })
                  }}
                  type='number'
                  name='maximumForks'
                  min='1'
                  placeholder='Maximum Forks'
                  id='maximumForks'
                  aria-label='Default'
                  aria-describedby='inputGroup-sizing-default'
                />
              </InputGroup>
            </div>
          </div>
          <div
            id='starsFilter'
            style={{
              display: 'flex',
              alignItems: 'center',
              margin: '20px',
              justifyContent: 'center',
              gap: '20px'
            }}
          >
            <h6>Number of Stars</h6>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '20px'
              }}
            >
              <InputGroup>
                <FormControl
                  onChange={e => {
                    dispatch({
                      type: 'MIN_STARS_ONLY',
                      payload: e.target.value
                    })
                  }}
                  type='number'
                  name='minimumStars'
                  min='1'
                  placeholder='Minimum Stars'
                  id='minimumStars'
                  aria-label='Default'
                  aria-describedby='inputGroup-sizing-default'
                />
              </InputGroup>
              <InputGroup>
                <FormControl
                  onChange={e => {
                    dispatch({
                      type: 'MAX_STARS_ONLY',
                      payload: e.target.value
                    })
                  }}
                  type='number'
                  name='maximumStars'
                  min='1'
                  placeholder='Maximum Stars'
                  id='maximumStars'
                  aria-label='Default'
                  aria-describedby='inputGroup-sizing-default'
                />
              </InputGroup>
            </div>
          </div>
          <Button onClick={onApplyClicked} variant='primary'>
            APPLY
          </Button>
        </div>
      </Collapse>
    </div>
  )
}

export default React.memo(RepoFilters)

// <div
//   style={{
//     width: '100%',
//     justifyContent: 'center',
//     display: 'flex',
//     gap: '50px'
//   }}
// >
//   <div
//     style={{
//       display: 'flex',
//       justifyContent: 'center',
//       gap: '20px'
//     }}
//   >
//     <input
//       type='number'
//       name='minimumForks'
//       placeholder='Minimum Forks'
//       id='minimumForks'
//     />
//     <input
//       type='number'
//       name='maximumForks'
//       placeholder='Maximum Forks'
//       id='maximumForks'
//     />
//   </div>

//   <div
//     style={{
//       display: 'flex',
//       justifyContent: 'center',
//       gap: '20px'
//     }}
//   >
//     <input
//       type='number'
//       placeholder='Minimum Stars'
//       name='minimumStars'
//       id='minimumStars'
//     />
//     <input
//       type='number'
//       name='maximumStars'
//       placeholder='Maximum Stars'
//       id='maximumStars'
//     />
//   </div>
// </div>
