import { TextareaProps } from "../../../../types/types";
import "../input/index.css";

/**
 * A holder for a textarea input
 * @param param0 the input props to render text area elements in new question and new answer forms
 * @returns a textarea element
 */
const Textarea = ({
    title,
    mandatory = true,
    hint,
    id,
    val,
    setState,
    err,
}: TextareaProps) => {
    return (
        <>
            <div className="input_title">
                {title}
                {mandatory ? "*" : ""}
            </div>
            {hint && <div className="input_hint">{hint}</div>}
            <textarea
                id={id}
                className="input_input"
                value={val}
                onInput={(e) => {
                    setState((e.target as HTMLTextAreaElement).value);
                }}
            />
            {err && <div className="input_error">{err}</div>}
        </>
    );
};

export default Textarea;
