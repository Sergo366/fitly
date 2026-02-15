export interface SerperSearchParameters {
  q: string;
  gl?: string;
  hl?: string;
  autocorrect?: boolean;
  page?: number;
  type: string;
}

export interface SerperKnowledgeGraph {
  title: string;
  type: string;
  website?: string;
  imageUrl?: string;
  description?: string;
  descriptionSource?: string;
  descriptionLink?: string;
  attributes?: Record<string, string>;
}

export interface SerperOrganicResult {
  title: string;
  link: string;
  snippet: string;
  position: number;
  sitelinks?: Array<{ title: string; link: string }>;
  attributes?: Record<string, string>;
  date?: string;
}

export interface SerperPeopleAlsoAsk {
  question: string;
  snippet: string;
  title: string;
  link: string;
}

export interface SerperRelatedSearch {
  query: string;
}

export interface SerperImageResult {
  title: string;
  imageUrl: string;
  imageWidth: number;
  imageHeight: number;
  thumbnailUrl: string;
  thumbnailWidth: number;
  thumbnailHeight: number;
  source: string;
  domain: string;
  link: string;
  googleUrl: string;
  position: number;
}

export interface SerperSearchResponse {
  searchParameters: SerperSearchParameters;
  knowledgeGraph?: SerperKnowledgeGraph;
  organic?: SerperOrganicResult[];
  peopleAlsoAsk?: SerperPeopleAlsoAsk[];
  relatedSearches?: SerperRelatedSearch[];
  images?: SerperImageResult[];
}
