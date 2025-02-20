import { useState } from "react";

interface FormData {
  username: string;
  text: string;
}

interface FormErrors {
  username?: string;
  text?: string;
}

export const useNewAnswerForm = (
  qid: string,
  addAnswer: Function,
  handleAnswer?: Function
) => {
  const [formData, setFormData] = useState<FormData>({ username: "", text: "" });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username cannot be empty";
    }

    if (!formData.text.trim()) {
      newErrors.text = "Answer text cannot be empty";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined })); // Clear error for the field
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      addAnswer(qid, {
        ansBy: formData.username.trim(),
        text: formData.text.trim()
      });

      handleAnswer?.(qid);
    }
  };

  return {
    formData,
    errors,
    handleInputChange,
    handleSubmit,
  };
};
