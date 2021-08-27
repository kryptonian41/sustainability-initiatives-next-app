// Generated by https://quicktype.io

export interface Article {
  id: number;
  body: string;
  title: string;
  slug: string;
  author: Author;
  location: Location;
  initiative: Initiative;
  published_at: string;
  created_at: string;
  updated_at: string;
  images: Picture[];
  heroImage: Picture;
  summary: string;
}

export interface Author {
  id: number;
  name: string;
  position: string;
  created_at: string;
  updated_at: string;
}

export interface Picture {
  id: number;
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: Formats | null;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: null;
  provider: string;
  provider_metadata: null;
  created_at: string;
  updated_at: string;
}

export interface Formats {
  thumbnail: Format;
  large: Format;
  medium: Format;
  small: Format;
}

export interface Format {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  path: null;
  url: string;
}

export interface Initiative {
  id: number;
  title: string;
  shortDescription: string;
  description: string;
  published_at: string;
  created_at: string;
  updated_at: string;
  icon: Picture;
}

export interface Location {
  id: number;
  label: string;
  created_at: string;
  updated_at: string;
}

export interface StakeHolder {
  id: number;
  name: string;
  slug: string;
  designation: string;
  education: null;
  about: null;
  author: Author | null;
  published_at: Date;
  created_at: Date;
  updated_at: Date;
  photo: Picture;
  socialLinks: SocialLinks | null;
}
export interface Associate {
  id: number;
  name: string;
  published_at: Date;
  created_at: Date;
  updated_at: Date;
  logo: Picture;
}
export interface Quote {
  id: number;
  quote: string;
  associate: Associate;
  published_at: Date;
  created_at: Date;
  updated_at: Date;
}

export interface SocialLinks {
  id: number;
  Twitter: string | null;
  YouTube: string | null;
  Facebook: string | null;
  Instagram: string | null;
}
