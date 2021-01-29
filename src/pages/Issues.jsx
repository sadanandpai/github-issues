import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setDataToDisplayAsync } from "../store/issuesSlice";
import styled from "styled-components";
import Spinner from "react-bootstrap/Spinner";

import Pagination from "../components/Pagination";
import Table from "../components/Table";

const FlexRowCenter = styled.div`
  display: flex;
  justify-content: center;
`;

export default function Issues() {
  const dispatch = useDispatch();
  let { page = 1 } = useParams();
  const issues = useSelector((state) => state.issues);

  useEffect(() => {
    dispatch(setDataToDisplayAsync(page));
  }, [page]);

  return (
    <>
      <FlexRowCenter>
        <h3>Github Open Issues Portal for Create-React-App</h3>
      </FlexRowCenter>

      {issues.dataStore[issues.activePageNumber] ? (
        <>
          <Table data={issues.dataStore[issues.activePageNumber]} />
          <FlexRowCenter>
            <Pagination />
          </FlexRowCenter>
        </>
      ) : (
        <FlexRowCenter style={{ alignItems: "center", height: "100vh" }}>
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </FlexRowCenter>
      )}
    </>
  );
}
