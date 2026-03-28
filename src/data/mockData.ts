export const MOCK_USER = {
  name: 'Alex & Sam',
  streak: 47,
  rank: 142,
  partnerName: 'Sam',
  partnerCode: 'L-7742',
  hasUploadedToday: true,
  daysToReset: 284,
  avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&h=200&fit=crop',
  todayPhotoUrl: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=500&h=800&fit=crop',
};

export const MOCK_LEADERBOARD = Array.from({ length: 50 }, (_, i) => ({
  id: String(i + 1),
  rank: i + 1,
  name: `${['Emma', 'Liam', 'Olivia', 'Noah', 'Ava'][i % 5]} & ${['James', 'Sophia', 'Lucas', 'Mia', 'Benjamin'][i % 5]}`,
  streak: 500 - i * 7,
  daysActive: 600 - i * 5,
  avatarUrl: `https://images.unsplash.com/photo-${[
    '1539571696357-5a69c17a67c6',
    '1507003211169-0a1dd7228f2d',
    '1494790108377-be9c29b29330',
    '1500648767791-00dcc994a43e',
    '1534528741775-53994a69daeb'
  ][i % 5]}?w=100&h=100&fit=crop`,
}));

export const MOCK_FEED = Array.from({ length: 20 }, (_, i) => ({
  id: String(i),
  coupleName: `${['Chloe', 'Ethan', 'Zoe', 'Leo'][i % 4]} & ${['Jack', 'Lily', 'Ryan', 'Maya'][i % 4]}`,
  streak: 120 - i * 3,
  location: ['New York, NY', 'London, UK', 'Tokyo, JP', 'Paris, FR', 'Swiss Alps', 'Bali, ID'][i % 6],
  likes: 42 + i * 2,
  timestamp: `${i + 1} hours ago`,
  photoUrl: `https://images.unsplash.com/photo-${[
    '1516589174184-c685 events-6bf960b943d7',
    '1523438885200-e635ba2c371e',
    '1529626455594-4ff0802cfb7e',
    '1531746020798-e6953c6e8e04',
    '1518196775791-2e1bbd387eb8',
    '1511895426328-dc8714191300'
  ][i % 6]}?w=800&h=1200&fit=crop`,
}));

export const MOCK_COMMENTS = [
  { id: '1', name: 'Emma', text: 'You guys are literal goals! 🔥', time: '2m ago' },
  { id: '2', name: 'Lucas', text: 'Keep that streak going!!', time: '15m ago' },
  { id: '3', name: 'Sophia', text: 'Where was this taken? So pretty!', time: '1h ago' },
];

export const MOCK_BADGES = [
  { id: '1', name: 'Week Warriors', description: '7 day streak achieved', unlocked: true, icon: 'Flame' },
  { id: '2', name: 'Monthly Devotion', description: '30 day streak achieved', unlocked: true, icon: 'Calendar' },
  { id: '3', name: 'Century Couple', description: '100 day streak achieved', unlocked: false, icon: 'Award' },
  { id: '4', name: 'Yearly Champions', description: '365 day streak achieved', unlocked: false, icon: 'Trophy' },
  { id: '5', name: 'Early Adopter', description: 'Joined in the first month', unlocked: true, icon: 'Clock' },
  { id: '6', name: 'Social Butterfly', description: 'Liked 100 photos', unlocked: true, icon: 'Heart' },
  { id: '7', name: 'Streak Saver', description: 'Used a streak freeze', unlocked: false, icon: 'Zap' },
  { id: '8', name: 'Morning Birds', description: 'Uploaded before 9 AM', unlocked: false, icon: 'Sun' },
  { id: '9', name: 'Night Owls', description: 'Uploaded after 10 PM', unlocked: true, icon: 'Moon' },
  { id: '10', name: 'Travelers', description: 'Uploaded from 5 different cities', unlocked: false, icon: 'Map' },
  { id: '11', name: 'Loyalty King', description: 'Top 100 on leaderboard', unlocked: false, icon: 'Crown' },
  { id: '12', name: 'Photo Experts', description: '1000 total uploads', unlocked: false, icon: 'Camera' },
];

export const STREAK_HISTORY = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  status: i < 15 ? 'uploaded' : i === 20 ? 'missed' : 'future',
}));
