export const mockUser = {
  id: 'u1',
  name: 'Jane Doe',
  email: 'jane@example.com',
  role: 'admin',
  dupr: 4.2,
  wins: 28,
  losses: 14,
  status: 'active'
};

export const mockTeam = {
  id: 't1',
  name: 'Racket Rebels',
  members: [
    { id: 'u1', name: 'Jane Doe', status: 'active', dupr: 4.2, wins: 28, losses: 14, email: 'jane@example.com', role: 'captain' },
    { id: 'u2', name: 'John Smith', status: 'active', dupr: 3.8, wins: 22, losses: 18, email: 'john@example.com', role: 'player' },
    { id: 'u3', name: 'Sarah Lee', status: 'away', dupr: 4.5, wins: 35, losses: 10, email: 'sarah@example.com', role: 'player' }
  ]
};

export const mockSchedule = [
  { id: 's1', date: '2026-06-01', time: '10:00 AM', location: 'Court 1', opponent: 'Net Ninjas' },
  { id: 's2', date: '2026-06-08', time: '11:00 AM', location: 'Court 2', opponent: 'Paddle Smashers' },
  { id: 's3', date: '2026-06-15', time: '2:00 PM', location: 'Court 3', opponent: 'Court Kings' }
];

export const mockScorecards = [
  { id: 'sc1', matchId: 's1', result: 'Win', score: '11-5, 11-8' },
  { id: 'sc2', matchId: 's2', result: 'Loss', score: '9-11, 10-12' }
];

export const mockLocations = [
  { id: 'loc1', name: 'Sunrise Courts', address: '123 Palm Ave, Miami FL', courts: 6, hours: '8:00 AM - 8:00 PM' },
  { id: 'loc2', name: 'Downtown Pickleball Hub', address: '456 Main St, Austin TX', courts: 4, hours: '6:00 AM - 10:00 PM' },
  { id: 'loc3', name: 'Riverside Club', address: '789 River Rd, Portland OR', courts: 8, hours: '7:00 AM - 9:00 PM' }
];

export const mockPlayers = [
  { id: 'p1', name: 'Jane Doe', email: 'jane@example.com', phone: '555-0101', dupr: 4.2, wins: 28, losses: 14, status: 'active' },
  { id: 'p2', name: 'John Smith', email: 'john@example.com', phone: '555-0102', dupr: 3.8, wins: 22, losses: 18, status: 'active' },
  { id: 'p3', name: 'Sarah Lee', email: 'sarah@example.com', phone: '555-0103', dupr: 4.5, wins: 35, losses: 10, status: 'active' },
  { id: 'p4', name: 'Mike Chen', email: 'mike@example.com', phone: '555-0104', dupr: 3.2, wins: 15, losses: 25, status: 'inactive' },
  { id: 'p5', name: 'Lisa Park', email: 'lisa@example.com', phone: '555-0105', dupr: 4, wins: 20, losses: 20, status: 'active' }
];

export const mockTeams = [
  { id: 't1', name: 'Racket Rebels', locationId: 'loc1', playerIds: ['p1', 'p2'], status: 'active', description: 'Competitive team focused on aggressive play', wins: 12, losses: 5 },
  { id: 't2', name: 'Net Ninjas', locationId: 'loc2', playerIds: ['p3', 'p4'], status: 'active', description: 'Strategic team with strong defense', wins: 10, losses: 7 },
  { id: 't3', name: 'Paddle Smashers', locationId: 'loc3', playerIds: ['p5'], status: 'inactive', description: 'Rebuilding roster for next season', wins: 5, losses: 12 }
];

export const mockDivisions = [
  { id: 'd1', name: 'Division A - Advanced', leagueId: 'l1' },
  { id: 'd2', name: 'Division B - Intermediate', leagueId: 'l1' },
  { id: 'd3', name: 'Division A - Advanced', leagueId: 'l2' },
  { id: 'd4', name: 'Division B - Intermediate', leagueId: 'l2' },
  { id: 'd5', name: 'Division C - Beginner', leagueId: 'l2' }
];

export const mockLeagues = [
  { id: 'l1', name: 'Summer Championship', seasonName: 'Summer 2026', startDate: '2026-06-01', endDate: '2026-08-31', divisionIds: ['d1', 'd2'], teamIds: ['t1', 't2'] },
  { id: 'l2', name: 'Fall Classic', seasonName: 'Fall 2026', startDate: '2026-09-01', endDate: '2026-11-30', divisionIds: ['d3', 'd4', 'd5'], teamIds: ['t1', 't2', 't3'] }
];

export const mockNotifications = [
  { id: 'n1', type: 'match', message: 'Upcoming match vs Net Ninjas tomorrow', read: false, timestamp: '2026-05-20T10:00:00Z' },
  { id: 'n2', type: 'score', message: 'New scorecard posted for your last match', read: true, timestamp: '2026-05-19T15:30:00Z' }
];

export const mockUsers = [mockUser];

export const mockMatches = [
  ...mockSchedule.map(s => ({
    id: s.id,
    date: s.date,
    time: s.time,
    locationId: 'loc1',
    homeTeamId: 't1',
    awayTeamId: 't2',
    homeTeamName: 'Racket Rebels',
    awayTeamName: s.opponent,
    status: 'scheduled',
    division: 'Division A'
  })),
  {
    id: 'm1',
    date: '2026-05-15',
    time: '6:00 PM',
    locationId: 'loc1',
    homeTeamId: 't1',
    awayTeamId: 't2',
    homeTeamName: 'Racket Rebels',
    awayTeamName: 'Net Ninjas',
    status: 'completed',
    division: 'Division A',
    homeScore: 11,
    awayScore: 8
  },
  {
    id: 'm2',
    date: '2026-05-10',
    time: '3:00 PM',
    locationId: 'loc2',
    homeTeamId: 't2',
    awayTeamId: 't3',
    homeTeamName: 'Net Ninjas',
    awayTeamName: 'Paddle Smashers',
    status: 'completed',
    division: 'Division A',
    homeScore: 11,
    awayScore: 6
  }
];

export const mockAnalyticsData = {
  totalMatches: 42,
  totalPlayers: 15,
  avgDupr: 3.8,
  winRate: 0.65
};

export const mockAdminKpis = {
  activeLeagues: 2,
  totalTeams: 3,
  pendingScorecards: 5,
  systemHealth: 'good'
};

export const getMatchById = (id) => mockSchedule.find(s => s.id === id) || mockSchedule[0];
export const getScorecardById = (id) => mockScorecards.find(s => s.id === id) || mockScorecards[0];
export const getTeamById = (id) => mockTeam;
export const getLocationById = (id) => mockLocations.find(l => l.id === id) || mockLocations[0];
