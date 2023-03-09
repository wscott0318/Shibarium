import React, { useMemo } from 'react'
import { NavLink } from 'react-bootstrap';

interface Entites {
    totalCount: number;
    pageSize: number;
    siblingCount?: number;
    currentPage: number;
}
interface Props {

    onPageChange: (index: number) => void;
}
type PaginationProps = Props & Entites;

const Pagination: React.FC<PaginationProps> = ({ totalCount, pageSize, onPageChange, siblingCount = 1, currentPage }) => {
  
    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize
    });


    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };

    let lastPage = paginationRange[paginationRange.length - 1]
    return (
      <>
        <div className="row ">
          <div className="col-md-4 d-flex align-items-center">
            {currentPage !== lastPage && totalCount > 1 && (
              <span className="fw-700 text-white">
                Showing {(currentPage - 1) * pageSize + 1}-
                {totalCount > pageSize ? currentPage * pageSize : totalCount} of{" "}
                {totalCount}
              </span>
            )}
            {currentPage === lastPage && totalCount > 1 && (
              <span className="fw-700 text-white">
                Showing {(currentPage - 1) * pageSize + 1}-
                {totalCount} of{" "}
                {totalCount}
              </span>
            )}
          </div>
          <div className="col-md-8 cus-space">
            <div className="cus-pagination">
              <ul className="pagination justify-content-end">
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                >
                  {/* <a className="page-link" href="#!" onClick={onPrevious}>
                    <span>Previous</span>
                  </a> */}
                  <NavLink
                    className="page-link"
                    onClick={(e) => {
                      e.preventDefault();
                      onPrevious();
                    }}
                  >
                    <span>Previous</span>
                  </NavLink>
                </li>
                {paginationRange.map((pageNumber: any) => {
                  if (pageNumber === DOTS) {
                    return (
                      <li key={pageNumber} className="pagination-item dots">
                        &#8230;
                      </li>
                    );
                  }
                  return (
                    <li
                      key={pageNumber}
                      className={`page-item ${
                        pageNumber === currentPage ? "active" : ""
                      }`}
                      onClick={() => onPageChange(pageNumber)}
                    >
                      {/* <a className="page-link" href="#!">
                        <span>{pageNumber}</span>
                      </a> */}
                      <NavLink
                        className="page-link"
                        onClick={(e) => e.preventDefault()}
                      >
                        <span>{pageNumber}</span>
                      </NavLink>
                    </li>
                  );
                })}

                <li
                  className={`page-item ${
                    currentPage === lastPage ? "disabled" : ""
                  }`}
                  onClick={onNext}
                >
                  <NavLink
                    className="page-link"
                    onClick={(e) => e.preventDefault()}
                  >
                    <span>Next</span>
                  </NavLink>
                  {/* <a className="page-link" href="#!">
                    <span>Next</span>
                  </a> */}
                </li>
              </ul>
            </div>
          </div>
        </div>
       
      </>
    );
}
export const DOTS = '...';

const usePagination = ({
    totalCount,
    pageSize,
    siblingCount = 1,
    currentPage
}: Entites) => {
    const paginationRange = useMemo(() => {
        const totalPageCount = Math.ceil(totalCount / pageSize);

        // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
        const totalPageNumbers = siblingCount + 5;

        /*
          Case 1:
          If the number of pages is less than the page numbers we want to show in our
          paginationComponent, we return the range [1..totalPageCount]
        */
        if (totalPageNumbers >= totalPageCount) {
            return range(1, totalPageCount);
        }

        /*
            Calculate left and right sibling index and make sure they are within range 1 and totalPageCount
        */
        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
        const rightSiblingIndex = Math.min(
            currentPage + siblingCount,
            totalPageCount
        );

        /*
          We do not show dots just when there is just one page number to be inserted between the extremes of sibling and the page limits i.e 1 and totalPageCount. Hence we are using leftSiblingIndex > 2 and rightSiblingIndex < totalPageCount - 2
        */
        const shouldShowLeftDots = leftSiblingIndex > 2;
        const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

        const firstPageIndex = 1;
        const lastPageIndex = totalPageCount;

        /*
            Case 2: No left dots to show, but rights dots to be shown
        */
        if (!shouldShowLeftDots && shouldShowRightDots) {
            let leftItemCount = 3 + 2 * siblingCount;
            let leftRange = range(1, leftItemCount);

            return [...leftRange, DOTS, totalPageCount];
        }

        /*
            Case 3: No right dots to show, but left dots to be shown
        */
        if (shouldShowLeftDots && !shouldShowRightDots) {

            let rightItemCount = 3 + 2 * siblingCount;
            let rightRange = range(
                totalPageCount - rightItemCount + 1,
                totalPageCount
            );
            return [firstPageIndex, DOTS, ...rightRange];
        }

        /*
            Case 4: Both left and right dots to be shown
        */
        if (shouldShowLeftDots && shouldShowRightDots) {
            let middleRange = range(leftSiblingIndex, rightSiblingIndex);
            return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
        }
    }, [totalCount, pageSize, siblingCount, currentPage]);

    return paginationRange || [];
};


const range = (start: number, end: number) => {
    let length = end - start + 1;
    /*
        Create an array of certain length and set the elements within it from
      start value to end value.
    */
    return Array.from({ length }, (_, idx) => idx + start);
};

export default Pagination