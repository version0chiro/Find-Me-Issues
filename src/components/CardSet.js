import React, { useState, useEffect, useContext } from 'react'
import SingleCard from './SingleCard'
import { makeStyles } from '@material-ui/core/styles'
import axios from 'axios'
import { isEmpty } from 'lodash'
//Context
import { ThemeContext } from '../Context/themeContext'

const useStyles = makeStyles(theme => ({
  cardSet: {
    margin: '15px'
  }
}))

/**
 * 
 * @param {string|null} language 
 * @param {string|null} searchQuery 
 * @param {{min: int, max: int}|null} forks
 * @param {{min: int, max: int}|null} stars
 * @param {int} pageNumber 
 * @param {string|null} starSort Accepted values are 'asc or 'desc' or null
 * @param {string|null} forkSort Accepted values are 'asc or 'desc' or null
 * @returns 
 */
const fetchGithubRepositories = async (language, searchQuery, forks, stars, pageNumber, starSort, forkSort) => {
  const url = "https://api.github.com/search/repositories";
  let forksQuery, starsQuery;

  if (forks) {
    if (forks.min && !forks.max) {
      forksQuery = ` forks:>=${forks.min}`;
    } else if (forks.max && !forks.min) {
      forksQuery = ` forks:<=${forks.max}`;
    } else {
      forksQuery = ` forks:${forks.min}..${forks.max}`;
    }
  }
  if (stars) {
    if (stars.min && !stars.max) {
      starsQuery = ` stars:>=${stars.min}`;
    } else if (stars.max && !stars.min) {
      starsQuery = ` stars:<=${stars.max}`;
    } else {
      starsQuery = ` stars:${stars.min}..${stars.max}`;
    }
  }

  return axios.get(url, {
    params: {
      page: pageNumber,
      per_page: 10,
      order: starSort ? starSort : (forkSort ? forkSort : 'desc'),
      sort: starSort ? 'stars' : (forkSort ? 'forks' : null),
      q: encodeURIComponent(`${searchQuery ?? ''}${language ? ' language:'+language:''}${forksQuery ?? ''}${starsQuery ?? ''}`),
    }
  });
}

const CardSet = props => {
  const [repositores, setRepositories] = useState([])
  const classes = useStyles()
  const [isLoading, setIsLoading] = useState(false)
  const [wasRejected, setWasRejected] = useState(false)
  const { theme } = useContext(ThemeContext)

  useEffect(() => {
    setIsLoading(true)
    // GET request using axios inside useEffect React hook
    fetchGithubRepositories(props.language,searchQuery, forks, stars, props.pageNumber, starSort, forkSort)
      .then(
        async response => {
          // console.log(response.data.items);
          let maxPageNumber = Math.floor(response.data.total_count / 10)
          props.setMaxPageNumber(maxPageNumber)
          setRepositories(response.data.items)
          setWasRejected(false)
          setIsLoading(false)
        },
        rejection => {
          if (rejection.response.status === 403) setWasRejected(true)
          //console.log(rejection.response.data)
        }
      )
      .catch(errors => {
        setIsLoading(false)
        //catch all (show some message)
        //console.log(errors)
      })
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, [props])

  return (
    <div style={{ backgroundColor: theme.bg, color: theme.color }}>
      {isLoading ? (
        <div className='loader-container'>
          <div className='loader'></div>
          <h5>Fetching some good first issues for you...</h5>
          {wasRejected && (
            <h5 style={{ color: 'red' }}>
              You are seeing this message because github imposes rate limit on
              requests. Please refresh the page or wait a couple of minutes.
            </h5>
          )}
        </div>
      ) : (
        <div className={classes.cardSet}>
          {isEmpty(repositores) ? (
            <div>
              <h5>
                No issues to be shown at the moment, please try again later.
              </h5>
            </div>
          ) : (
            !isEmpty(repositores) &&
            repositores.map(repo => <SingleCard key={repo.id} repo={repo} />)
          )}
        </div>
      )}
    </div>
  )
}

export default CardSet
