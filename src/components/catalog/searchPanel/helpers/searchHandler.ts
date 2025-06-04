export const searchHandler = (
  e: Event
): {
  [k: string]: FormDataEntryValue;
} => {
  e.preventDefault();
  const form = e.target as HTMLFormElement | null;
  if (!form) throw new Error("Form elemend doesnt exist");
  const formData = new FormData(form);
  const fields = Object.fromEntries(
    formData.entries().filter(([, /* key */ value]) => Boolean(value))
  );
  return fields;
};
