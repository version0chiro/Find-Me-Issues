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

const CardSet = props => {
  const [repositores, setRepositories] = useState([])
  const classes = useStyles()
  const [isLoading, setIsLoading] = useState(false)
  const [wasRejected, setWasRejected] = useState(false)
  const { theme } = useContext(ThemeContext)
  const [forksQuery, setForksQuery] = useState('')
  const [starsQuery, setStarsQuery] = useState('')

  let url = `https://api.github.com/search/repositories?q=good-first-issues:>0+language:${
    props.language
  }${
    !isEmpty(props.inputSearch) ? `:${props.inputSearch}+in%3Atitle` : ''
  }&page=${props.pageNumber}&per_page=10`

  let urlSuffix = ''

  useEffect(() => {
    const onAppliedFilters = () => {
      if (
        props.reducedState.minForks !== '' &&
        props.reducedState.maxForks === ''
      ) {
        setForksQuery(`forks:>=${props.reducedState.minForks}`)
      } else if (
        props.reducedState.maxForks !== '' &&
        props.reducedState.minForks === ''
      ) {
        setForksQuery(`forks:<=${props.reducedState.maxForks}`)
      } else if (
        props.reducedState.maxForks !== '' &&
        props.reducedState.minForks !== ''
      ) {
        setForksQuery(
          `forks:${props.reducedState.minForks}..${props.reducedState.maxForks}`
        )
      } else {
        setForksQuery('')
      }

      if (forksQuery !== '') {
        const urlSplits = url.split('?q=')
        url = urlSplits[0] + '?q=' + forksQuery + '+' + urlSplits[1]
      }

      if (
        props.reducedState.minStars !== '' &&
        props.reducedState.maxStars === ''
      ) {
        setStarsQuery(`stars:>=${props.reducedState.minForks}`)
      } else if (
        props.reducedState.maxStars !== '' &&
        props.reducedState.minStars === ''
      ) {
        setStarsQuery(`stars:<=${props.reducedState.maxStars}`)
      } else if (
        props.reducedState.maxStars !== '' &&
        props.reducedState.minStars !== ''
      ) {
        setStarsQuery(
          `stars:${props.reducedState.minStars}..${props.reducedState.maxStars}`
        )
      } else {
        setStarsQuery('')
      }

      if (starsQuery !== '') {
        const urlSplits = url.split('?q=')
        url = urlSplits[0] + '?q=' + starsQuery + '+' + urlSplits[1]
      }
    }

    onAppliedFilters()
  }, [props, url, forksQuery, starsQuery])

  if (props.sortByStars === 'desc') urlSuffix = '&sort=stars&order=desc'
  else if (props.sortByStars === 'asc') urlSuffix = '&sort=stars&order=asc'
  else if (props.sortByForks === 'desc') urlSuffix = '&sort=forks&order=desc'
  else if (props.sortByForks === 'asc') urlSuffix = '&sort=forks&order=asc'

  useEffect(() => {
    // console.log("stars", props.sortByStars, "forks", props.sortByForks);
    url += urlSuffix
    console.log(url)
    setIsLoading(true)
    // GET request using axios inside useEffect React hook
    axios
      .get(url)
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
  }, [props, url])

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