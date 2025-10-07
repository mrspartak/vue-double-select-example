export type GeoCountry = [id: number, iso2: string, name: string];

export type ConvertedCountry = {
  name: string;
  code: string;
};

export type GeoState = [id: number, iso2: string, name: string, timezone: string]

export type ConvertedState = {
  name: string
  code: string
}
