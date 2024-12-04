export const makeImagePath = (id: string, format?: string) => {
  return `https://image.tmdb.org/t/p/${format ? format : "original"}/${id}`;
};

const certificationMapping: Record<string, string> = {
  G: "all",
  PG: "12",
  R: "15",
  NC: "19",
};

export const mapCertificationToAge = (certification: string) => {
  return certificationMapping[certification.replace(/[^A-Za-z]/g, "")] ?? "All";
};

export const runtimeCalc = (time: number) => {
  const hour = Math.floor(time / 60);
  const minute = Math.round(time % 60);
  const runtime =
    (hour > 0 ? `${hour}시간 ` : "") +
    (minute > 0
      ? `${minute > 9 ? minute : hour <= 0 ? minute : `0${minute}`}분`
      : "");
  return runtime;
};

export const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const certificationInfo = (text: string | undefined) => {
  switch (text) {
    case "12":
    case "PG":
      return { age: "12", color: "#7EC627" };
    case "15":
    case "15세 이상 관람가":
    case "PG-13":
      return { age: "15", color: "#E9B239" };
    case "19":
    case "18":
    case "R":
    case "청소년 관람불가":
      return { age: "19", color: "#ED4030" };
    default:
      return { age: "ALL", color: "#48C1A5" };
  }
};
