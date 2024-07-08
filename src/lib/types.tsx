export interface PublicSwimmingPool {
  id: string;
  FACLT_NM: string;
  SIGUN_NM: string;
  CONTCT_NO: string;
  HMPG_ADDR: string;
  IRREGULR_RELYSWIMPL_LENG: string;
  IRREGULR_RELYSWIMPL_LANE_CNT: string;
  [key: string]: string;
}

export interface ReviewData {
  swimmingpool_id: string;
  swimmingpool_address: string;
  review_content: string;
  swimmingpool_name: string;
  author_user_id: string;
  author_user_name: string;
  reg_date: string;
}
