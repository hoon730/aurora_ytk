export const makeImagePath = (id: string, format?: string) => {
  return `https://image.tmdb.org/t/p/${format ? format : "original"}/${id}`;
};

export const runtimeCalc = (time: number) => {
  const hour = Math.floor(time / 60);
  const minute = Math.round(time % 60);
  const runtime =
    (hour > 0 ? `${hour}시간 ` : "") +
    (minute > 0 ? `${minute > 9 ? minute : `0${minute}`}분` : "");
  return runtime;
};
