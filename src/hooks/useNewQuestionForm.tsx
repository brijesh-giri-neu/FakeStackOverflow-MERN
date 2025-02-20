import { useState, useCallback } from 'react';

interface FormState {
  title: string;
  text: string;
  tags: string;
  username: string;
}

interface FormErrors {
  title?: string;
  text?: string;
  tags?: string;
  username?: string;
}

export const useNewQuestionForm = (addQuestion: Function, handleQuestions?: () => void) => {
  const [formData, setFormData] = useState<FormState>({
    title: '',
    text: '',
    tags: '',
    username: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};

    // Title validation
    if (!formData.title.trim()) {
      newErrors.title = 'Question Title cannot be empty';
    } else if (formData.title.length > 100) {
      newErrors.title = 'Title cannot be more than 100 characters';
    }

    // Text validation
    if (!formData.text.trim()) {
      newErrors.text = 'Question text cannot be empty';
    }

    // Tags validation
    const tagsArray = formData.tags.trim().split(/\s+/).filter(tag => tag);
    if (tagsArray.length === 0) {
      newErrors.tags = 'At least one tag is required';
    } else if (tagsArray.length > 5) {
      newErrors.tags = 'Cannot have more than 5 tags';
    } else {
      // Check individual tag lengths
      const longTags = tagsArray.filter(tag => tag.length > 20);
      if (longTags.length > 0) {
        newErrors.tags = 'New tag length cannot be more than 20';
      }
    }

    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = 'Username cannot be empty';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleInputChange = (name: keyof FormState, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      const tagsArray = formData.tags.trim().split(/\s+/).filter(tag => tag);
      const newQuestion = {
        title: formData.title.trim(),
        text: formData.text.trim(),
        tags: tagsArray,
        askedBy: formData.username.trim()
      };

      addQuestion(newQuestion);
      handleQuestions?.();
    }
  };

  return {
    formData,
    errors,
    handleInputChange,
    handleSubmit
  };
}; 