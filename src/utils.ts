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
