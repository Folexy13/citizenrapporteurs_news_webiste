import { useState } from "react";

export const useForm = (validateValue, value) => {
  const [enteredValue, setEnteredValue] = useState(value);
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(enteredValue) && enteredValue?.length > 0;
  const hasError = !valueIsValid && isTouched;
  const valueChangedHandler = (e) => {
    setEnteredValue(e.target.value);
  };
  const inputBlurHandler = (e) => {
    setIsTouched(true);
  };
  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
  };
  return {
    value: enteredValue,
    hasError,
    valueChangedHandler,
    inputBlurHandler,
    isValid: valueIsValid,
    reset,
  };
};
