import React, { useEffect, useMemo, useState } from 'react'

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

    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }

    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };

    let lastPage = paginationRange[paginationRange.length - 1]

    return (
        <div className="text-center pagination-sec">
            <div className="row align-items-center">
                <div className="col-lg-7 col-md-12 cus-pagination ms-auto">
                    <div className="d-inline-block">
                        <ul className="pagination">
                            <li className={`page-item ${lastPage}`} >
                                <a  className="page-link" href="#"  onClick={onPrevious}>
                                    <span>Previous</span>
                                </a>
                            </li>
                            {paginationRange.map((pageNumber: any) => {
                                if (pageNumber === DOTS) {
                                    return <li className="pagination-item dots">&#8230;</li>;
                                }
                                return (
                                    <li className="page-item" onClick={() => onPageChange(pageNumber)}>
                                        <a className="page-link" href="#">
                                            <span>{pageNumber}</span>
                                        </a>
                                    </li>)
                            }
                            )}

                            <li className="page-item" onClick={onNext}>
                                <a className="page-link" href="#">
                                    <span>Next</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col-lg-3 col-md-12 text-center text-lg-end mt-3 mt-lg-0">
                    <span className="fw-700">Showing 1-8 of 300</span>
                </div>
            </div>
        </div>
    )
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