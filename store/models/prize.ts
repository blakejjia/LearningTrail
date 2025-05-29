export interface PrizeDetail {
  title?: string;
  description?: string;
  requirements?: string;
  image?: string;
}

export interface Prize {
  id: string;
  details?: PrizeDetail;
}
