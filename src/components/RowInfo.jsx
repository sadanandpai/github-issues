import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";

const IssueTitle = styled.div`
  font-size: 1rem;
`;

const IssueDetail = styled.div`
  font-size: 0.8rem;
`;

const Label = styled.span`
  background-color: ${(props) => "#" + props.color};
  border-radius: 10px;
  padding: 0 5px;
  margin: 0 5px;
  font-size: 0.8rem;
  vertical-align: top;
  padding-bottom: 2px;
  font-weight: 500;
`;

export default function RowInfo({ page, index, issue, labels }) {
  return (
    <div>
      <IssueTitle>
        <Link to={`/issues/${page}/details/${index}`}>{issue.title}</Link>
        {issue.labels.map((label) => (
          <Label color={label.color} key={label.name}>
            {label.name}
          </Label>
        ))}
      </IssueTitle>
      <IssueDetail>
        Opened <ReactTimeAgo date={new Date(issue.created_at)} locale="en-US" /> by {issue.user.login}
      </IssueDetail>
    </div>
  );
}
