// Generated by https://quicktype.io

export interface Article {
  id:           number;
  body:         string;
  title:        string;
  slug:         string;
  author:       Author;
  location:     Location;
  initiative:   Initiative;
  published_at: string;
  created_at:   string;
  updated_at:   string;
}

export interface Author {
  id:         number;
  name:       string;
  position:   string;
  about:      string;
  education:  string;
  created_at: string;
  updated_at: string;
  picture:    Picture;
}

export interface Picture {
  id:                number;
  name:              string;
  alternativeText:   string;
  caption:           string;
  width:             number;
  height:            number;
  formats:           Formats | null;
  hash:              string;
  ext:               string;
  mime:              string;
  size:              number;
  url:               string;
  previewUrl:        null;
  provider:          string;
  provider_metadata: null;
  created_at:        string;
  updated_at:        string;
}

export interface Formats {
  thumbnail: Large;
  large:     Large;
  medium:    Large;
  small:     Large;
}

export interface Large {
  name:   string;
  hash:   string;
  ext:    string;
  mime:   string;
  width:  number;
  height: number;
  size:   number;
  path:   null;
  url:    string;
}

export interface Initiative {
  id:               number;
  title:            string;
  shortDescription: string;
  description:      string;
  published_at:     string;
  created_at:       string;
  updated_at:       string;
  icon:             Picture;
}

export interface Location {
  id:         number;
  label:      string;
  created_at: string;
  updated_at: string;
}
