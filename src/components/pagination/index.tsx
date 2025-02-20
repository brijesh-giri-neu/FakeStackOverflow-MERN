import "./index.css";
import { PaginationProps } from "../../types/types";
import { usePagination } from "../../hooks/usePagination";

/**
 * A component to display the pagination buttons
 * A user can press next to see the next five questions and press prev to see the previous five questions
 * The first five questions do not show the prev button 
 * and the last five questions wrap around when the next button is pressed
 * @param param0 the props for the Pagination component
 * pageNum: the start index from which the questions are to be fetched; only five questions are fetched at a time
 * qSize: the total number of questions fetched
 * search: the search query
 * title: the title of the page
 * setQuestionPage: the function to reset the pageInstance
 * @returns the pagination buttons
 */
const Pagination = ({ pageNum, qSize, search, title, setQuestionPage }: PaginationProps) => {
    const { handleNext, handlePrev, showPrev, pageNumber, totalPages } = usePagination({
        pageNum,
        qSize,
        search,
        title,
        setQuestionPage
    });


    return (
        <div className="pagination">
            {showPrev && (
                <button 
                    className="prev-btn pagination-button" 
                    onClick={handlePrev}
                >
                    Prev
                </button>
            )}
            <span className="page-info">
                Page {pageNumber} of {totalPages}
            </span>
            <button 
                className="next-btn pagination-button" 
                onClick={handleNext}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;