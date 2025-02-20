import "./index.css";
import { OrderButtonProps } from "../../../../../types/types";

/**
 * A component for order buttons
 * @param param0 the order name to be displayed and the function to change the order
 * @returns the order button
 */

const OrderButton = ({ message, setQuestionOrder }: OrderButtonProps) => {
    return (
        <button className="btn" onClick={() => {
            if(setQuestionOrder) 
                setQuestionOrder(message);
        }}>
            {message}
        </button>
    );
};

export default OrderButton;
