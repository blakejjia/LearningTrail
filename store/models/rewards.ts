export interface RewardDetail {
  title: string;
  description: string;
  requirements: string;
  image: string;
}

export interface Reward {
  id: string;
  details: RewardDetail;
}
