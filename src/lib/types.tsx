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
  id: string;
  address: string;
  contents: string;
  name: string;
  user: string;
  reg_date: string;
}
