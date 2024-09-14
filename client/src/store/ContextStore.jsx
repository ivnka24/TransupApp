import { createContext, useState } from "react";
import { useForm } from "../hooks/useForm";

export const ContextStore = createContext("default value");

export default function ContextProvider({ children }) {
  const [formConfig, setFormConfig] = useState({
    initialValues: {},
    onSubmit: async (values) => {},
    endpoint: null,
    isEdit: false,
  });

  const {
    values,
    handleChange,
    handleSubmit,
    isLoading,
    error,
    formData,
    setValues,
  } = useForm(
    formConfig.initialValues,
    formConfig.onSubmit,
    formConfig.endpoint,
    formConfig.isEdit
  );

  const updateFormConfig = (newConfig) => {
    setFormConfig((prevConfig) => ({
      ...prevConfig,
      ...newConfig,
    }));
    if (newConfig.initialValues) {
      setValues(newConfig.initialValues);
    }
  };

  return (
    <ContextStore.Provider
      value={{
        values,
        handleChange,
        handleSubmit,
        isLoading,
        error,
        formData,
        updateFormConfig,
      }}
    >
      {children}
    </ContextStore.Provider>
  );
}
