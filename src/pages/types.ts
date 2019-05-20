export interface AvailableSports {
  sports: Array<{
    sport_id: number;
    sport_name: string;
  }>;
}

export interface EventsBySport {
  meta: {
    delta_last_id: string;
  };
  event: Array<Event>;
}

type Event = {
  event_id: string;
  sport_id: number;
  event_date: string;
  rotation_number_away: number;
  rotation_number_home: number;
  teams: Array<Team>;
  teams_normalized: Array<NormalizedTeam>;
  lines: { [key: string]: Line };
};

type Team = {
  team_id: number;
  team_normalized_id: number;
  is_away: boolean;
  is_home: boolean;
  name: string;
};

type NormalizedTeam = {
  team_id: number;
  name: string;
  mascot: string;
  abbreviation: string;
  is_away: boolean;
  is_home: boolean;
  ranking: string;
  record: string;
};

type Line = {
  line_id: number;
  moneyline: Moneyline;
  spread: Spread;
  total: Total;
  affiliate: Affiliate;
};

type Moneyline = {
  line_id: number;
  moneyline_away: number;
  moneyline_away_delta: number;
  moneyline_home: number;
  moneyline_home_delta: number;
  date_updated: string;
  format: string;
};

type Spread = {
  line_id: number;
  point_spread_away: number;
  point_spread_away_delta: number;
  point_spread_home: number;
  point_spread_home_delta: number;
  point_spread_away_money: number;
  point_spread_away_money_delta: number;
  point_spread_home_money: number;
  point_spread_home_money_delta: number;
  date_updated: string;
  format: string;
};

type Total = {
  line_id: number;
  total_over: number;
  total_over_delta: number;
  total_under: number;
  total_under_delta: number;
  total_over_money: number;
  total_over_money_delta: number;
  total_under_money: number;
  total_under_money_delta: number;
  date_updated: string;
  format: string;
};

type Affiliate = {
  affiliate_id: number;
  affiliate_name: string;
  affiliate_url: string;
};
