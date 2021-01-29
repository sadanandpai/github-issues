import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import ReactTimeAgo from "react-time-ago";

const DetailContainer = styled.div`
  margin: 10px 25px;
`;

const Title = styled.div`
  font-size: 2rem;
`;

const Info = styled.div`
  font-size: 0.8rem;
`;

const Details = styled(ReactMarkdown)`
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding: 20px;

  & * {
    font-size: 1rem;
  }

  img {
    max-width: 100%;
  }
`;

export default function IssuesDetails() {
  let { page, id } = useParams();
  const issues = useSelector((state) => state.issues);
  const issue = issues.dataStore[page]?.[id];

  return (
    <DetailContainer>
      <Title>{issue?.title}</Title>
      <Info>
        {issue.user.login} opened this issue <ReactTimeAgo date={new Date(issue.created_at)} locale="en-US" />
      </Info>
      <Details>{issue.body}</Details>
    </DetailContainer>
  );
}
