import React from "react";
import { TagParamType } from "../../../../types/types";

interface TagButtonProps {
    tid: string;
    getTagById: (tid: string) => TagParamType | null;
    handleTagClick: (tid: string, event: React.MouseEvent<HTMLButtonElement>) => void;
}

/**
 * A reusable button component for displaying a tag.
 * Prevents event propagation to parent elements.
 */
const TagButton = ({ tid, getTagById, handleTagClick }: TagButtonProps) => {
    return (
        <button 
            key={tid} 
            className="question_tag_button"
            onClick={(e) => handleTagClick(tid, e)}
        >
            {getTagById(tid)?.name}
        </button>
    );
};

export default TagButton;
