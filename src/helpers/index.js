// import placeholder from "../../assets/images/placeholder.jpg";
export const handleImage = (image) => {
  if (typeof image == "string" && image) {
    if (image?.indexOf("http") < 0)
      image = `${process.env.NEXT_PUBLIC_MAIN_URL}${image}`;
    else image = image?.replace("https", "http");
  }
  return image || "";
};

export const getReducedOptions = (arr, name) =>
  [...new Set(arr?.map((p) => p?.[name]?.en || p?.[name]))]?.map(
    (e) => arr?.find((i) => (i?.[name]?.en || i?.[name]) == e)?.[name]
  );

export function getYoutubeId(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url?.match(regExp);

  return match && match[2].length === 11 ? match[2] : null;
}
