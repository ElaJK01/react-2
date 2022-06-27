import React, { useMemo } from "react";
import { add, divide, map, range, subtract } from "ramda";
import { DOTS } from "../constants";
import styled, { css } from "styled-components";

const PaginationContainer = styled.div`
  background-color: whitesmoke;
  display: flex;
  height: fit-content;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  margin: 5px;
  box-sizing: border-box;
  position: fixed;

  @media screen and (min-width: 320px) and (max-width: 768px) {
    display: none;
  }
`;

const disabledStyles = css`
  pointer-events: none;
  opacity: 0.5;
`;

const ArrowUp = styled.a`
  ${({ disabled }) => disabled && disabledStyles}
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid darkgray;
  background: whitesmoke;
  border-radius: 5px;
  margin-bottom: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  color: gray;
  font-size: 10px;
  text-align: center;
  width: 0;
  color: black;
  text-decoration: none;
`;

const ArrowDown = styled.a`
  ${({ disabled }) => disabled && disabledStyles}
  background: whitesmoke;
  border-style: none;
  border-radius: 5px;
  margin-bottom: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  color: gray;
  font-size: 10px;
  text-align: center;
  color: black;
  text-decoration: none;
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 10px solid darkgray;
`;

const FloatingPanelButton = styled.a`
  background: ${({ active }) => (active ? "rgba(0, 0, 0, 0.2)" : "whitesmoke")};
  border-style: none;
  border-radius: 5px;
  margin-bottom: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  color: gray;
  font-size: 10px;
  text-align: center;
  width: 80%;
  color: black;
  text-decoration: none;
`;

const paginationCount = (
  totalItems,
  itemsPerPage,
  adjacentPages,
  currentPage
) => {
  const pageNumbers = Math.ceil(divide(totalItems, itemsPerPage));

  const visiblePageNumbers = adjacentPages + 5;

  if (visiblePageNumbers >= pageNumbers) {
    return range(1, pageNumbers);
  }

  const leftBorderPagesIndex = Math.max(
    subtract(currentPage, adjacentPages),
    1
  );

  const rightBorderPagesIndex = Math.min(
    add(currentPage, adjacentPages),
    pageNumbers
  );

  const shouldShowLeftDots = leftBorderPagesIndex > 2;
  const shouldShowRightDots = rightBorderPagesIndex < pageNumbers - 2;

  const firstPageIndex = 1;
  const lastPageIndex = pageNumbers;

  if (!shouldShowLeftDots && shouldShowRightDots) {
    const leftItemCount = 3 + 2 * adjacentPages;
    const leftRange = range(1, leftItemCount);
    return [...leftRange, DOTS, pageNumbers];
  }

  if (shouldShowLeftDots && !shouldShowRightDots) {
    const rightItemCount = 3 + 2 * adjacentPages;
    const rightRange = range(pageNumbers - rightItemCount + 1, pageNumbers);
    return [firstPageIndex, DOTS, ...rightRange];
  }

  if (shouldShowLeftDots && shouldShowRightDots) {
    const middleRange = range(leftBorderPagesIndex, rightBorderPagesIndex);
    return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
  }
};

const Pagination = (props) => {
  const {
    itemsPerPage,
    totalItems,
    paginate,
    currentPage,
    adjacentPages = 1,
  } = props;

  const paginationRange = useMemo(
    () => paginationCount(totalItems, itemsPerPage, adjacentPages, currentPage),
    [totalItems, itemsPerPage, adjacentPages, currentPage]
  );

  const onPrevious = () => {
    paginate(currentPage - 1);
  };

  const onNext = () => {
    paginate(currentPage + 1);
  };

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const lastPage = paginationRange[paginationRange.length - 1];

  return (
    <PaginationContainer>
      <ArrowUp disabled={currentPage === 1} onClick={onPrevious} />
      {map((page) => {
        if (page === DOTS) {
          return (
            <FloatingPanelButton active={currentPage === page}>
              &#8230;
            </FloatingPanelButton>
          );
        }
        return (
          <FloatingPanelButton
            onClick={() => paginate(page)}
            key={page}
            active={currentPage === page}
          >
            {page}
          </FloatingPanelButton>
        );
      }, paginationRange)}
      <ArrowDown disabled={currentPage === lastPage} onClick={onNext} />
    </PaginationContainer>
  );
};

export default Pagination;
