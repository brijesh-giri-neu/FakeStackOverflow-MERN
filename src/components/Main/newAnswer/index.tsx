import "./index.css";
import Form from "../baseComponents/form";
import { NewAnswerProps } from "../../../types/types";
import { useNewAnswerForm } from "../../../hooks/useNewAnswerForm";
import Input from "../baseComponents/input";
import Textarea from "../baseComponents/textarea";
/**
 * A component to render the form for adding a new answer
 * @param param0 the props passed to the component -- the question id, the function to add the answer, and the function reset the page if the answer is added
 * @returns a form to add a new answer
 */
const NewAnswer = ({ qid, addAnswer, handleAnswer }: NewAnswerProps) => {
  const { formData, errors, handleInputChange, handleSubmit } =
    useNewAnswerForm(qid, addAnswer, handleAnswer);

  return (
    <Form>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <Input
            id="answerUsernameInput"
            title="Username"
            val={formData.username}
            setState={(e) => handleInputChange("username", e)}
            err={errors.username}
          />
        </div>

        <div className="form-group">
          <Textarea
            id="answerTextInput"
            title="Answer Text"
            val={formData.text}
            setState={(e) => handleInputChange("text", e)}
            err={errors.text}
          />
        </div>

        <div className="form-footer">
          <button type="submit" className="post-button">
            Post Answer
          </button>
          <div className="mandatory-hint">* indicates mandatory fields</div>
        </div>
      </form>
    </Form>
  );
};

export default NewAnswer;
