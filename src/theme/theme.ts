export const theme = {
  colors: {
    // Backgrounds - clean white
    background: '#FFFFFF',
    surface: '#F8F8F8',
    card: '#FFFFFF',
    cardElevated: '#F2F2F2',

    // Primary - romantic rose/crimson
    accent: '#E8294C',
    accentDark: '#B01F3A',
    accentSoft: '#FFE0E6',       // Light pink bg for badges etc

    // Gold - premium rewards
    gold: '#F5C842',
    goldSoft: '#FFF8DC',
    goldDark: '#C49A0A',

    // Text
    text: '#0A0A0A',             // Near black
    textMuted: '#8E8E93',        // iOS gray
    textFaint: '#C7C7CC',        // Placeholder

    // UI
    border: '#EFEFEF',
    borderSoft: '#F5F5F5',
    success: '#34C759',          // iOS green
    error: '#E8294C',
    glass: 'rgba(232, 41, 76, 0.06)',
    glassDark: 'rgba(0,0,0,0.04)',

    // Gamification
    flame: '#FF6B35',
    flameDark: '#E84A0C',
    streak: '#E8294C',

    // Leaderboard
    rankGold: '#F5C842',
    rankSilver: '#AEAEB2',
    rankBronze: '#CD7F32',
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
    xxxl: 48,
  },

  borderRadius: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    full: 9999,
  },

  typography: {
    fontFamily: {
      headline: 'PlayfairDisplay_700Bold',
      headlineMedium: 'PlayfairDisplay_500Medium',
      body: 'Inter_400Regular',
      bodyMedium: 'Inter_500Medium',
      bodyBold: 'Inter_700Bold',
    },
    fontSize: {
      xs: 11,
      sm: 13,
      md: 15,
      lg: 18,
      xl: 22,
      xxl: 28,
      xxxl: 36,
      display: 48,
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.8,
    },
    letterSpacing: {
      tight: -0.5,
      normal: 0,
      wide: 0.5,
      wider: 1.5,
    },
  },

  shadow: {
    sm: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.06,
      shadowRadius: 4,
      elevation: 2,
    },
    md: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.08,
      shadowRadius: 12,
      elevation: 4,
    },
    gold: {
      shadowColor: '#F5C842',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.25,
      shadowRadius: 12,
      elevation: 6,
    },
  },
};

export type Theme = typeof theme;