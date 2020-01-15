const fs = require('fs');
const path = require('path');
const makeDir = require('make-dir');

const api = require('../src/api');

console.log('Downloading metadata from Halo API...');

Promise.all([
  api.getHalo5SpartanRanksMetadata(),
  api.getHalo5SeasonsMetadata(),
  api.getHalo5PlaylistsMetadata(),
  api.getHalo5CsrDesignationsMetadata(),
  api.getHalo5WeaponsMetadata(),
  api.getHalo5MedalsMetadata(),
  api.getHalo5EnemiesMetadata(),
  api.getHalo5ImpulsesMetadata(),
  api.getHalo5VehiclesMetadata(),
  api.getHalo5TeamColorsMetadata(),
  api.getHalo5CommendationsMetadata(),
]).then(([
  spartanRanks,
  seasons,
  playlists,
  csrDesignations,
  weapons,
  medals,
  enemies,
  impulses,
  vehicles,
  teamColors,
  commendations,
]) => {
  const dir = path.join(__dirname, '..', 'src', 'metadata');

  return makeDir(dir)
    .then(() =>
      Promise.all([
        writeFile(
          path.join(dir, 'h5-spartan-ranks.json'),
          JSON.stringify(spartanRanks)
        ),
        writeFile(path.join(dir, 'h5-seasons.json'), JSON.stringify(seasons)),
        writeFile(path.join(dir, 'h5-playlists.json'), JSON.stringify(playlists)),
        writeFile(
          path.join(dir, 'h5-csr-designations.json'),
          JSON.stringify(csrDesignations)
        ),
        writeFile(path.join(dir, 'h5-weapons.json'), JSON.stringify(weapons)),
        writeFile(path.join(dir, 'h5-medals.json'), JSON.stringify(medals)),
        writeFile(path.join(dir, 'h5-enemies.json'), JSON.stringify(enemies)),
        writeFile(path.join(dir, 'h5-impulses.json'), JSON.stringify(impulses)),
        writeFile(path.join(dir, 'h5-vehicles.json'), JSON.stringify(vehicles)),
        writeFile(path.join(dir, 'h5-team-colors.json'), JSON.stringify(teamColors)),
        writeFile(path.join(dir, 'h5-commendations.json'), JSON.stringify(commendations)),
      ])
    )
    .then(
      () => {
        console.log('Halo API metadata saved!');
        process.exit(0);
      },
      err => {
        console.log('Error saving Halo API metadata. See below for details.');
        console.dir(err);
        process.exit(1);
      }
    );
});

function writeFile(path, content) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, content, 'utf-8', function(err) {
      if (!err) {
        resolve();
      } else {
        reject(err);
      }
    });
  });
}
