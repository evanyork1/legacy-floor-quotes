
import { useNavigate } from "react-router-dom";

export const useQuoteSubmission = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate('/');
  };

  return {
    handleSubmit,
    isSubmitting: false
  };
};
