/// <reference types="vite/client" />

type FormDataType = {
  [key: string]: FormDataEntryValue;
};

export const collectFormData = (form: HTMLFormElement): FormDataType => {
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  console.log(import.meta.env.VITE_CTP_CLIENT_ID);

  return data;
};
