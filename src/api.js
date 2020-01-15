const axios = require('axios');

const instance = axios.create({
  baseURL: 'https://www.haloapi.com/',
  headers: { 'Ocp-Apim-Subscription-Key': process.env.HALO_API_KEY },
});
const halo5SeasonsMetadata = requireIfExists('./metadata/h5-seasons.json', []);
const halo5PlaylistsMetadata = requireIfExists('./metadata/h5-playlists.json', []);
const halo5WeaponsMetadata = requireIfExists('./metadata/h5-weapons', []);
const halo5MedalsMetadata = requireIfExists('./metadata/h5-medals', []);
const halo5EnemiesMetadata = requireIfExists('./metadata/h5-enemies', []);
const halo5ImpulsesMetadata = requireIfExists('./metadata/h5-impulses', []);
const halo5VehiclesMetadata = requireIfExists('./metadata/h5-vehicles', []);
const halo5TeamsMetadata = requireIfExists('./metadata/h5-team-colors', []);
const halo5PlayerCommendations = requireIfExists('./metadata/h5-commendations', []);
const halo5SeasonsMetadataMap = convertArrayToObjectMap(halo5SeasonsMetadata, 'id');
const halo5PlaylistsMetadataMap = convertArrayToObjectMap(halo5PlaylistsMetadata, 'id');
const halo5WeaponsMetadataMap = convertArrayToObjectMap(halo5WeaponsMetadata, 'id');
const halo5MedalsMetadataMap = convertArrayToObjectMap(halo5MedalsMetadata, 'id');
const halo5EnemiesMetadataMap = convertArrayToObjectMap(halo5EnemiesMetadata, 'id');
const halo5ImpulsesMetadataMap = convertArrayToObjectMap(halo5ImpulsesMetadata, 'id');
const halo5VehiclesMetadataMap = convertArrayToObjectMap(halo5VehiclesMetadata, 'id');
const halo5TeamsMetadataMap = convertArrayToObjectMap(halo5TeamsMetadata, 'id');
const halo5TeamsCommendationsMap = convertArrayToObjectMap(halo5PlayerCommendations, 'id');

function requireIfExists(path, defaultValue) {
  let module = defaultValue;

  try {
    module = require(path);
  } catch (e) {}

  return module;
}

function convertArrayToObjectMap(array, key) {
  const result = {};

  if (Array.isArray(array)) {
    array.forEach(item => {
      result[item[key]] = item;
    });
  }

  return result;
}

function formatSizeEnum(size) {
  return size.split('SIZE_')[1];
}

function getHalo5Appearance(gamertag) {
  return instance
    .get(`/profile/h5/profiles/${gamertag}/appearance`)
    .then(response => response.data);
}

function getHalo5Emblem(gamertag, size = 'SIZE_128') {
  return instance
    .get(`/profile/h5/profiles/${gamertag}/emblem?size=${formatSizeEnum(size)}`, {
      maxRedirects: 0,
      validateStatus: status => status === 302,
    })
    .then(response => ({
      url: response.request.res.headers.location,
    }));
}

function getHalo5SpartanImage(gamertag, size = 'SIZE_256', crop = 'full') {
  return instance
    .get(`/profile/h5/profiles/${gamertag}/spartan?size=${formatSizeEnum(size)}&crop=${crop}`, {
      maxRedirects: 0,
      validateStatus: status => status === 302,
    })
    .then(response => ({
      url: response.request.res.headers.location,
    }));
}

function getHalo5ServiceRecordArena(gamertag, seasonId) {
  let url = `/stats/h5/servicerecords/arena?players=${gamertag}`;

  if (seasonId) {
    url += `&seasonId=${seasonId}`;
  }

  return instance.get(url).then(response => response.data.Results[0]);
}

function getHalo5ServiceRecordWarzone(gamertag) {
  return instance
    .get(`/stats/h5/servicerecords/warzone?players=${gamertag}`)
    .then(response => response.data.Results[0]);
}

function getHalo5PlayerMatchHistory(gamertag, modes, start = 0, count = 25, includeTime = false) {
  let url = `/stats/h5/players/${gamertag}/matches?start=${start}&count=${count}&include-times=${includeTime}`;
  const gameModes = Array.isArray(modes) && modes.join(',');

  if (gameModes) {
    url += `&modes=${gameModes}`;
  }

  return instance.get(url).then(response => response.data);
}

function getHalo5PlayerCommendations(gamertag) {
  return instance
    .get(`/stats/h5/players/${gamertag}/commendations`)
    .then(response => response.data);
}

function getHalo5Company(id) {
  return instance.get(`/stats/h5/companies/${id}`).then(response => response.data);
}

function getHalo5CompanyCommendations(id) {
  return instance.get(`/stats/h5/companies/${id}/commendations`).then(response => response.data);
}

function getHalo5Seasons() {
  return halo5SeasonsMetadata;
}

function getHalo5Season(id) {
  return halo5SeasonsMetadataMap[id] || null;
}

function getHalo5Playlists() {
  return halo5PlaylistsMetadata;
}

function getHalo5Playlist(id) {
  return halo5PlaylistsMetadataMap[id] || null;
}

function getHalo5Teams() {
  return halo5TeamsMetadata;
}

function getHalo5Team(id) {
  return halo5TeamsMetadataMap[id] || null;
}

function getHalo5Weapons() {
  return halo5WeaponsMetadata;
}

function getHalo5Weapon(id) {
  return halo5WeaponsMetadataMap[id] || null;
}

function getHalo5Medals() {
  return halo5MedalsMetadata;
}

function getHalo5Medal(id) {
  return halo5MedalsMetadataMap[id] || null;
}

function getHalo5Enemies() {
  return halo5EnemiesMetadata;
}

function getHalo5Enemy(id) {
  return halo5EnemiesMetadataMap[id] || null;
}

function getHalo5Impulses() {
  return halo5EnemiesMetadata;
}

function getHalo5Impulse(id) {
  return halo5ImpulsesMetadataMap[id] || null;
}

function getHalo5Commendations() {
  return halo5TeamsCommendationsMap;
}

function getHalo5Commendation(id) {
  return halo5TeamsCommendationsMap[id] || null;
}

function getHalo5Vehicles() {
  return halo5VehiclesMetadata;
}

function getHalo5Vehicle(id) {
  return halo5VehiclesMetadataMap[id] || null;
}

function getHalo5SpartanRanksMetadata() {
  return instance.get('/metadata/h5/metadata/spartan-ranks').then(response => response.data);
}

function getHalo5SeasonsMetadata() {
  return instance.get('/metadata/h5/metadata/seasons').then(response => response.data.reverse());
}

function getHalo5PlaylistsMetadata() {
  return instance.get('/metadata/h5/metadata/playlists').then(response => response.data.reverse());
}

function getHalo5CsrDesignationsMetadata() {
  return instance.get('/metadata/h5/metadata/csr-designations').then(response => response.data);
}

function getHalo5WeaponsMetadata() {
  return instance.get('/metadata/h5/metadata/weapons').then(response => response.data);
}

function getHalo5MedalsMetadata() {
  return instance.get('/metadata/h5/metadata/medals').then(response => response.data);
}

function getHalo5EnemiesMetadata() {
  return instance.get('/metadata/h5/metadata/enemies').then(response => response.data);
}

function getHalo5ImpulsesMetadata() {
  return instance.get('/metadata/h5/metadata/impulses').then(response => response.data);
}

function getHalo5VehiclesMetadata() {
  return instance.get('/metadata/h5/metadata/vehicles').then(response => response.data);
}

function getHalo5TeamColorsMetadata() {
  return instance.get('/metadata/h5/metadata/team-colors').then(response => response.data);
}

function getHalo5CommendationsMetadata() {
  return instance.get('/metadata/h5/metadata/commendations').then(response => response.data);
}

module.exports = {
  getHalo5Appearance,
  getHalo5Emblem,
  getHalo5SpartanImage,
  getHalo5ServiceRecordArena,
  getHalo5ServiceRecordWarzone,
  getHalo5PlayerMatchHistory,
  getHalo5PlayerCommendations,
  getHalo5Company,
  getHalo5CompanyCommendations,
  getHalo5Seasons,
  getHalo5Season,
  getHalo5Playlists,
  getHalo5Playlist,
  getHalo5Teams,
  getHalo5Team,
  getHalo5Weapons,
  getHalo5Weapon,
  getHalo5Medals,
  getHalo5Medal,
  getHalo5Enemies,
  getHalo5Enemy,
  getHalo5Impulses,
  getHalo5Impulse,
  getHalo5Vehicles,
  getHalo5Vehicle,
  getHalo5Commendations,
  getHalo5Commendation,
  getHalo5SpartanRanksMetadata,
  getHalo5SeasonsMetadata,
  getHalo5PlaylistsMetadata,
  getHalo5CsrDesignationsMetadata,
  getHalo5WeaponsMetadata,
  getHalo5MedalsMetadata,
  getHalo5EnemiesMetadata,
  getHalo5ImpulsesMetadata,
  getHalo5VehiclesMetadata,
  getHalo5TeamColorsMetadata,
  getHalo5CommendationsMetadata,
};
