import { Animate } from "react-show";
const IssuesList = (props)=>{

    return (
        <Animate
            show={props.openIssues}
            duration={500}
            style={{ height: "auto" }}
            start={{
              // The starting styles for the hidden component.
              opacity: 0,
              height: 0,
            }}
            enter={{
              // These styles will be applied when the component enters
              opacity: 1,
              height: "auto",
            }}
            leave={{
              // these styles will be applied when the component leaves
              opacity: 0,
              height: 0,
            }}
          >
            Hello
            {/* {openIssues?<div>Hello world!</div>:<div></div>} */}
          </Animate>
    )
}

export default IssuesList;