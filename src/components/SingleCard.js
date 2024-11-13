import { Card, Button } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import axios from "axios";
import { isEmpty } from "lodash";
import iconButton from "./../button_icon.png";
import Loading from "./Loading";
import { ThemeContext } from "../Context/themeContext";

const SingleCard = (props) => {
  const [repo, setRepo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [wasRejected, setWasRejected] = useState(false);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    setIsLoading(false);
    axios
      .get(props.repo.url)
      .then(
        (response) => {
          setWasRejected(false);
          setIsLoading(false);
          setRepo(response.data);
        },
        (rejection) => {
          if (rejection.response.status === 403) setWasRejected(true);
        }
      )
      .catch((errors) => {
        setIsLoading(false);
        console.log(errors);
      });
  }, [props.repo.url]);

  const [openIssues, setOpen] = useState(false);

  return (
    <div
      className="w-96 bg-gradient-to-t from-[#0373A1] to-[#012A3B] text-white p-4 rounded-3xl transform transition-transform duration-300 hover:scale-105"
      style={{
        WebkitTextStroke: "0.4px white",
        height: "100%",
        margin: "10px",
      }}
    >
      {wasRejected && (
        <div
          className={`min-h-36 flex items-center justify-center p-9 shadow-xl ${
            theme.mode === "light" ? "bg-slate-200" : "bg-gray-800"
          } rounded-md`}
        >
          <p className="balance text-red-600 font-medium">
            You are seeing this message because github imposes rate limit on
            requests. Please refresh the page or wait a couple of minutes.
          </p>
        </div>
      )}
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <>
          {!isEmpty(repo) && (
            <div className="flex flex-col justify-center items-center gap-2">
              <Avatar
                style={{
                  display: "inline-block",
                  border: "1.5px solid lightgray",
                }}
                src={repo.owner.avatar_url}
              />
              <div className="flex flex-col justify-center items-center">
                <span className="font-bold text-sm">Repository:</span>
                <span className="text-sm">{repo.name}</span>
              </div>
              <div className="flex flex-col justify-center items-center">
                <span className="font-bold text-sm">About:</span>
                {repo.description ? (
                  <span className="text-sm max-h-10 w-[90%] text-wrap overflow-x-hidden overflow-y-auto">
                    {repo.description}
                  </span>
                ) : null}
              </div>
              <div className="flex flex-col justify-center items-center">
                <span className="font-bold text-sm">Language:</span>
                <span className="text-sm">{repo.language}</span>
              </div>
              <a
                href={`${props.repo.html_url}/labels/good%20first%20issue`}
                target="__blank"
              >
                <button
                  className="hover:scale-105 transition-all ease-linear duration-200 px-2 py-1 flex gap-1 bg-white text-black rounded-2xl justify-center items-center font-bold"
                  onClick={() => setOpen(!openIssues)}
                >
                  Issues
                  <img
                    className="w-5 h-5"
                    src={iconButton}
                    alt="Icon button"
                  ></img>
                </button>
              </a>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SingleCard;
