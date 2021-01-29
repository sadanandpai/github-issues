import React from "react";
import Pagination from "react-bootstrap/Pagination";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { setActivePageNumber } from "../store/issuesSlice";

export default function App() {
  const dispatch = useDispatch();
  const history = useHistory();

  const issues = useSelector((state) => state.issues);
  const activePageNumber = issues.activePageNumber;
  const totalPages = issues.totalPages;

  function onPageClick(event) {
    const pageDataLabel = event.target.closest("[data-page-number]")?.getAttribute("data-page-number");
    if (pageDataLabel) {
      let pageNumber;
      if (pageDataLabel === "first") pageNumber = 1;
      else if (pageDataLabel === "last") pageNumber = totalPages;
      else if (pageDataLabel === "previous") pageNumber = activePageNumber > 1 ? activePageNumber - 1 : activePageNumber;
      else if (pageDataLabel === "next") pageNumber = activePageNumber < totalPages ? activePageNumber + 1 : activePageNumber;
      else pageNumber = pageDataLabel;

      dispatch(setActivePageNumber(+pageNumber));
      history.push("/issues/" + pageNumber);
    }
  }

  let items = [];
  let ellipsis = true;
  for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
    if ([1, 2, activePageNumber - 1, activePageNumber, activePageNumber + 1, totalPages - 1, +totalPages, activePageNumber].includes(pageNumber)) {
      items.push(
        <Pagination.Item key={pageNumber} active={pageNumber === activePageNumber} data-page-number={pageNumber}>
          {pageNumber}
        </Pagination.Item>
      );
      ellipsis = false;
    } else if (!ellipsis) {
      ellipsis = true;
      items.push(<Pagination.Ellipsis key={pageNumber} />);
    }
  }

  return (
    <Pagination onClick={onPageClick}>
      <Pagination.First data-page-number="first" />
      <Pagination.Prev data-page-number="previous" />
      {items}
      <Pagination.Next data-page-number="next" />
      <Pagination.Last data-page-number="last" />
    </Pagination>
  );
}
