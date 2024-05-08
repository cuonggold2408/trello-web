export const capitalizeFirstLetter = (val) => {
  if (!val) return "";
  val = val.toLowerCase();
  return `${val.charAt(0).toUpperCase()}${val.slice(1)}`;
};
