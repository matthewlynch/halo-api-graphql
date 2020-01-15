const { GUIDResolver, HexColorCodeResolver, URLResolver } = require('graphql-scalars');

const api = require('../api');

const resolvers = {
  Query: {
    player: (parent, { gamertag }) => ({ gamertag }),
    halo5Appearance: (parent, { gamertag }) => api.getHalo5Appearance(gamertag),
    halo5Emblem: (parent, { gamertag, size }) => api.getHalo5Emblem(gamertag, size),
    halo5SpartanImage: (parent, { gamertag, size }) => api.getHalo5SpartanImage(gamertag, size),
    halo5ServiceRecordArena: (parent, { gamertag, seasonId }) =>
      api.getHalo5ServiceRecordArena(gamertag, seasonId),
    halo5ServiceRecordWarzone: (parent, { gamertag }) => api.getHalo5ServiceRecordWarzone(gamertag),
    halo5PlayerMatchHistory: (parent, { gamertag, modes, start, count, includeTime }) =>
      api.getHalo5PlayerMatchHistory(gamertag, modes, start, count, includeTime),
    halo5PlayerCommendations: (parent, { gamertag }) => api.getHalo5PlayerCommendations(gamertag),
    halo5Company: (parent, { id }) => api.getHalo5Company(id),
    halo5CompanyCommendations: (parent, { id }) => api.getHalo5CompanyCommendations(id),
    halo5TeamsMetadata: () => api.getHalo5Teams(),
    halo5TeamMetadata: (parent, { id }) => api.getHalo5Team(id),
    halo5WeaponsMetadata: () => api.getHalo5Weapons(),
    halo5WeaponMetadata: (parent, { id }) => api.getHalo5Weapon(id),
    halo5MedalsMetadata: () => api.getHalo5Medals(),
    halo5MedalMetadata: (parent, { id }) => api.getHalo5Medal(id),
    halo5EnemiesMetadata: () => api.getHalo5Enemies(),
    halo5EnemyMetadata: (parent, { id }) => api.getHalo5Enemy(id),
    halo5ImpulsesMetadata: () => api.getHalo5Impulses(),
    halo5ImpulseMetadata: (parent, { id }) => api.getHalo5Impulse(id),
    halo5VehiclesMetadata: () => api.getHalo5Vehicles(),
    halo5VehicleMetadata: (parent, { id }) => api.getHalo5Vehicle(id),
    halo5CommendationsMetadata: () => api.getHalo5Commendations(),
    halo5CommendationMetadata: (parent, { id }) => api.getHalo5Commendation(id),
  },
  Player: {
    halo5Appearance: ({ gamertag }) => api.getHalo5Appearance(gamertag),
    halo5Emblem: ({ gamertag }, { size }) => api.getHalo5Emblem(gamertag, size),
    halo5SpartanImage: ({ gamertag }, { size, crop }) =>
      api.getHalo5SpartanImage(gamertag, size, crop),
    halo5ServiceRecordArena: ({ gamertag }, { seasonId }) =>
      api.getHalo5ServiceRecordArena(gamertag, seasonId),
    halo5ServiceRecordWarzone: ({ gamertag }) => api.getHalo5ServiceRecordWarzone(gamertag),
    halo5PlayerMatchHistory: ({ gamertag }, { modes, start, count, includeTime }) =>
      api.getHalo5PlayerMatchHistory(gamertag, modes, start, count, includeTime),
    halo5PlayerCommendations: ({ gamertag }) => api.getHalo5PlayerCommendations(gamertag),
  },
  Halo5ArenaStats: {
    HighestCsrPlaylistInfo: parent => api.getHalo5Playlist(parent.HighestCsrPlaylistId),
    HighestCsrSeasonInfo: parent => api.getHalo5Season(parent.HighestCsrSeasonId),
  },
  Halo5PlayerCompanyMembership: {
    CompanyInfo: parent => api.getHalo5Company(parent.Id),
  },
  Halo5Company: {
    Commendations: parent => api.getHalo5CompanyCommendations(parent.Id),
  },
  Halo5Team: {
    TeamInfo: parent => api.getHalo5Team(parent.Id),
  },
  Halo5WeaponId: {
    WeaponInfo: parent => api.getHalo5Weapon(parent.StockId),
  },
  Halo5MedalId: {
    MedalInfo: parent => api.getHalo5Medal(parent.MedalId),
  },
  Halo5EnemyId: {
    EnemyInfo: parent => api.getHalo5Enemy(parent.BaseId),
  },
  Halo5ImpulseId: {
    ImpulseInfo: parent => api.getHalo5Impulse(parent.Id),
  },
  Halo5ImpulseCount: {
    ImpulseInfo: parent => api.getHalo5Impulse(parent.Id),
  },
  Halo5VehicleId: {
    VehicleInfo: parent => api.getHalo5Vehicle(parent.BaseId),
  },
  Halo5ProgressiveCommendation: {
    CommendationInfo: parent => api.getHalo5Commendation(parent.Id),
  },
  Halo5MetaCommendation: {
    CommendationInfo: parent => api.getHalo5Commendation(parent.Id),
  },
  GUID: GUIDResolver,
  HexColorCode: HexColorCodeResolver,
  URL: URLResolver,
};

module.exports = resolvers;
