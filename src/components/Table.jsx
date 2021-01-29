import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { GoIssueOpened } from "react-icons/go";

import RowInfo from "./RowInfo";
import { useSelector } from "react-redux";

const IssueTable = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  margin: 10px;
  background-color: rgba(0, 0, 0, 0.05);
`;

const IssueRow = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.05);
  padding: 5px 10px;
  min-height: 40px;
  display: flex;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

const IconHolder = styled.div`
  margin: 0 5px;
  color: green;
`;

export default function Table({ data }) {
  let { page = 1 } = useParams();
  const issues = useSelector((state) => state.issues);

  return (
    <IssueTable>
      <IssueRow>{issues.count} Open</IssueRow>
      {data?.map((issue, index) => (
        <IssueRow key={issue.title}>
          <IconHolder>
            <GoIssueOpened />
          </IconHolder>
          <RowInfo page={page} index={index} issue={issue} />
        </IssueRow>
      ))}
    </IssueTable>
  );
}
