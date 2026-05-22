export const mockUser = {
  id: 'u1',
  name: 'Jane Doe',
  email: 'jane@example.com',
  role: 'admin'
};

export const mockTeam = {
  id: 't1',
  name: 'Racket Rebels',
  members: [
    { id: 'u1', name: 'Jane Doe', status: 'active' },
    { id: 'u2', name: 'John Smith', status: 'active' }
  ]
};

export const mockSchedule = [
  { id: 's1', date: '2026-06-01', time: '10:00 AM', location: 'Court 1', opponent: 'Net Ninjas' },
  { id: 's2', date: '2026-06-08', time: '11:00 AM', location: 'Court 2', opponent: 'Paddle Smashers' }
];

export const mockScorecards = [
  { id: 'sc1', matchId: 's1', result: 'Win', score: '11-5, 11-8' },
  { id: 'sc2', matchId: 's2', result: 'Loss', score: '9-11, 10-12' }
];

export const mockLocations = [
  { id: 'loc1', name: 'Sunrise Courts', address: '123 Palm Ave, Miami FL', courts: 6 },
  { id: 'loc2', name: 'Downtown Pickleball Hub', address: '456 Main St, Austin TX', courts: 4 },
  { id: 'loc3', name: 'Riverside Club', address: '789 River Rd, Portland OR', courts: 8 }
];

export const mockPlayers = [
  { id: 'p1', name: 'Jane Doe', email: 'jane@example.com', phone: '555-0101', dupr: 4.2 },
  { id: 'p2', name: 'John Smith', email: 'john@example.com', phone: '555-0102', dupr: 3.8 },
  { id: 'p3', name: 'Sarah Lee', email: 'sarah@example.com', phone: '555-0103', dupr: 4.5 },
  { id: 'p4', name: 'Mike Chen', email: 'mike@example.com', phone: '555-0104', dupr: 3.2 },
  { id: 'p5', name: 'Lisa Park', email: 'lisa@example.com', phone: '555-0105', dupr: 4.0 }
];

export const mockTeams = [
  { id: 't1', name: 'Racket Rebels', locationId: 'loc1', playerIds: ['p1', 'p2'], status: 'active' },
  { id: 't2', name: 'Net Ninjas', locationId: 'loc2', playerIds: ['p3', 'p4'], status: 'active' },
  { id: 't3', name: 'Paddle Smashers', locationId: 'loc3', playerIds: ['p5'], status: 'inactive' }
];

export const mockDivisions = [
  { id: 'd1', name: 'Division A - Advanced', leagueId: 'l1' },
  { id: 'd2', name: 'Division B - Intermediate', leagueId: 'l1' },
  { id: 'd3', name: 'Division A - Advanced', leagueId: 'l2' },
  { id: 'd4', name: 'Division B - Intermediate', leagueId: 'l2' },
  { id: 'd5', name: 'Division C - Beginner', leagueId: 'l2' }
];

export const mockLeagues = [
  { id: 'l1', name: 'Summer Championship', seasonName: 'Summer 2026', startDate: '2026-06-01', endDate: '2026-08-31', divisionIds: ['d1', 'd2'] },
  { id: 'l2', name: 'Fall Classic', seasonName: 'Fall 2026', startDate: '2026-09-01', endDate: '2026-11-30', divisionIds: ['d3', 'd4', 'd5'] }
];
