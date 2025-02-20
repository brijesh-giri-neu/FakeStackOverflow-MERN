import { InputProps } from "../../../../types/types";
import "./index.css";

/**
 * A holder for the input component
 * @param param0 the props of the input component
 * @returns the input component
 */
const Input = ({ title, hint, id, mandatory = true, val, setState, err }: InputProps) => {
    return (
        <>
            <div className="input_title">
                {title}
                {mandatory ? "*" : ""}
            </div>
            {hint && <div className="input_hint">{hint}</div>}
            <input
                id={id}
                className="input_input"
                type="text"
                value={val}
                onInput={(e) => {
                    setState((e.target as HTMLInputElement).value);
                }}
            />
            {err && <div className="input_error">{err}</div>}
        </>
    );
};

export default Input;
