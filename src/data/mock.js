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
