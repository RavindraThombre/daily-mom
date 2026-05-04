export const generateId = () => crypto.randomUUID();

export const getCurrentDate = () => {
  return new Date().toISOString().split("T")[0];
};

export const formatDisplayDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};
