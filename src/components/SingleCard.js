import { Card, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Emoji from "react-emoji-render";
import backg from "../git9.jpg";
import axios from "axios";
import { FiStar } from 'react-icons/fi';
import { GoRepoForked } from 'react-icons/go';
import { isEmpty } from "lodash";

const SingleCard = (props) => {
	// console.log(props.repo)
	const [repo, setRepo] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [wasRejected, setWasRejected] = useState(false);
	const [starsCount, setStarsCount] = useState('')
	const [forksCount, setForksCount] = useState('')

	useEffect(() => {
		setIsLoading(true);
		// GET request using axios inside useEffect React hook
		axios
			.get(props.repo.url)
			.then(
				(response) => {
					// console.log(response)
					setWasRejected(false);
					setIsLoading(false);
					setRepo(response.data);
					countAssigning(response?.data?.stargazers_count, response?.data?.forks_count)
				},
				(rejection) => {
					if (rejection.response.status === 403) setWasRejected(true);
				}
			)
			.catch((errors) => {
				setIsLoading(false);
				//console.log(errors)
			});
		// empty dependency array means this effect will only run once (like componentDidMount in classes)
	}, [props.repo.url]);

	const countAssigning = (starsCount, forksCount) => {

		let Scount = '';
		if (starsCount > 999) {
			let str = starsCount.toString();
			let frontPart = str.slice(0, str.length - 3);
			let lastPart = str.slice(str.length - 3);
			Scount = `${frontPart}${lastPart[0] != '0' ? '.' + lastPart[0] + 'k' : 'k'}`
			setStarsCount(Scount)
		} else {
			setStarsCount(starsCount)
		}

		let Fcount = '';
		if (forksCount > 999) {
			let str = forksCount.toString();
			let frontPart = str.slice(0, str.length - 3);
			let lastPart = str.slice(str.length - 3);
			Fcount = `${frontPart}${lastPart[0] != '0' ? '.' + lastPart[0] + 'k' : 'k'}`
			setForksCount(Fcount)
		} else {
			setForksCount(forksCount)
		}
	}

	const [openIssues, setOpen] = useState(false);
	return (
		<div
			style={{
				width: "100%",
				margin: "10px",
				padding: "10px",
				WebkitTextStroke: "0.4px white",
				height: "100%",
			}}
		>
			{wasRejected && (
				<small style={{ color: "red" }}>
					You are seeing this message because github imposes rate limit on
					requests. Please refresh the page or wait a couple of minutes.
				</small>
			)}
			{isLoading ? (
				<div className="loader"></div>
			) : (
				<>
					{!isEmpty(repo) && (
						<Card
							className="container container-fluid bg-dark text-white"
							border="info"
							style={{
								borderRadius: "1rem",
								borderWidth: "0.2rem",
								height: "100%",
								backgroundImage: `url(${backg})`,
							}}
						>
							<Card.Body>
								<div
									style={{
										borderColor: "white",
										borderWidth: "0.2rem",
									}}
								>
									<Avatar
										style={{
											display: "inline-block",
											border: "1.5px solid lightgray",
										}}
										src={repo?.owner?.avatar_url}
									/>
									<Card.Title>{repo?.name}</Card.Title>
								</div>
								<Card.Text>
									{repo?.description ? (
										<span style={{ WebkitTextStroke: "0.4px white" }}>
											<Emoji text={repo?.description} />{" "}
										</span>
									) : (
										<></>
									)}
								</Card.Text>
								<Card.Text>Issue description:</Card.Text>
								<Card.Text>{props.repo?.title}</Card.Text>
								<Card.Text> Language: {repo?.language}</Card.Text>
								<a href={`${props.repo?.html_url}/labels/good%20first%20issue`} target="__blank">
									<Button
										variant="outline-info"
										onClick={() => setOpen(!openIssues)}
									>
										Go To Issues
									</Button>
								</a>

								<div
									style={{
										width: 'auto',
										position: 'absolute',
										left: '15px',
										bottom: '15px'
									}}
								>
									<span
										className="singleCard__icons">
										<FiStar className="singleCard__icons__icon" />
										<button
											className="singleCard__icons__count"
										>{starsCount}</button>
									</span>

									<span
										className="singleCard__icons">

										<GoRepoForked className="singleCard__icons__icon" />
										<button
											className="singleCard__icons__count">{forksCount}</button>
									</span>
								</div>
							</Card.Body>
						</Card>
					)}
				</>
			)}

		</div>
	);
};

export default SingleCard;
