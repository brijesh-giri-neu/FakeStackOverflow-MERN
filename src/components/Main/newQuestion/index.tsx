import Form from "../baseComponents/form";
import Input from "../baseComponents/input";
import "./index.css";
import { NewQuestionProps } from "../../../types/types";
import { useNewQuestionForm } from "../../../hooks/useNewQuestionForm";
import Textarea from "../baseComponents/textarea";

/**
 * A component that renders a form for adding a new question
 * @param param0 input props for the component -- functions to add the question to the model and reset the pageInstance to home
 * @returns a form for adding a new question
 */

const NewQuestion = ({ addQuestion, handleQuestions }: NewQuestionProps) => {
  const {
    formData,
    errors,
    handleInputChange,
    handleSubmit
  } = useNewQuestionForm(addQuestion, handleQuestions);

  return (
    <Form>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <Input
            id="formTitleInput"
            title="Question Title"
            hint="Limit title to 100 characters or less"
            val={formData.title}
            setState={(e) => handleInputChange('title', e)}
            err={errors.title}
          />
        </div>

        <div className="form-group">
          <Textarea
            id="formTextInput"
            title="Question Text"
            hint="Add details"
            val={formData.text}
            setState={(e) => handleInputChange('text', e)}
            err={errors.text}
          />
        </div>

        <div className="form-group">
          <Input
            id="formTagInput"
            title="Tags"
            hint="Add keywords separated by whitespace"
            val={formData.tags}
            setState={(e) => handleInputChange('tags', e)}
            err={errors.tags}
          />
        </div>

        <div className="form-group">
          <Input
            id="formUsernameInput"
            title="Username"
            val={formData.username}
            setState={(e) => handleInputChange('username', e)}
            err={errors.username}
          />
        </div>

        <div className="form-footer">
          <button type="submit" className="post-button">Post Question</button>
          <div className="mandatory-hint">* indicates mandatory fields</div>
        </div>
      </form>
    </Form>
  );
};

export default NewQuestion;
