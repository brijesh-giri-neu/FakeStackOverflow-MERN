import "./index.css";
import { FormProps } from "../../../../types/types";

 /**
  * A holder for form elements
  * @param param0 children JSX elements to be rendered inside the form
  * @returns a div element with the class name form
  */

const Form = ({ children }: FormProps) => {
    return <div className="form">{children}</div>;
};

export default Form;
