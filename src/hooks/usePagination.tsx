import { useCallback, useRef } from "react";
import { PaginationProps } from "../types/types";

/**
 * Custom hook to handle pagination logic
 * @param props Pagination configuration and handlers
 * @returns Pagination state and handlers
 */
export const usePagination = ({ 
  pageNum: initialPageNum,
  qSize, 
  search,
  title,
  setQuestionPage
}: PaginationProps) => {

  const pageNumRef = useRef(initialPageNum); // Use ref to persist pageNum across renders

  /**
   * Handles next page navigation
   */
  const handleNext = useCallback(() => {
    const newPageNum = pageNumRef.current >= qSize - 5 ? 0 : pageNumRef.current + 5;
    pageNumRef.current = newPageNum; // Update ref
    setQuestionPage?.(newPageNum, search ?? "", title);
  }, [qSize, search, title, setQuestionPage]);

  /**
   * Handles previous page navigation
   */
  const handlePrev = useCallback(() => {
    if (pageNumRef.current >= 5) {
      const newPageNum = pageNumRef.current - 5;
      pageNumRef.current = newPageNum; // Update ref
      setQuestionPage?.(newPageNum, search ?? "", title);
    }
  }, [search, title, setQuestionPage]);

  /**
   * Determines if the previous button should be shown
   */
  const showPrev = pageNumRef.current >= 5;
  
  let pageNumber = Math.floor(pageNumRef.current / 5) + 1;
  const totalPages = Math.ceil(qSize / 5);

  if(totalPages === 0) {
    pageNumber = 0;
  }

  return {
    handleNext,
    handlePrev,
    showPrev,
    pageNumber,
    totalPages
  };
};
