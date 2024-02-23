/* eslint-disable no-console */
import neo4j, { Driver } from 'neo4j-driver';

let driver: Driver;

export async function setDriver(connectionURI: string, username: string, password: string) {
  try {
    driver = neo4j.driver(connectionURI, neo4j.auth.basic(username, password));
    await driver.getServerInfo();
    localStorage.setItem(
      'needleStarterKit-neo4j.connection',
      JSON.stringify({ uri: connectionURI, user: username, password: password })
    );
    return true;
  } catch (err) {
    console.error(`Connection error\n${err}\nCause: ${err as Error}`);
    return false;
  }
}

export async function disconnect() {
  try {
    await driver.close();
    return true;
  } catch (err) {
    console.error(`Disconnection error\n${err}\nCause: ${err as Error}`);
    return false;
  }
}

/*
  Everything below this line is only for providing examples based on datasets available in Neo4j Sandbox (sandbox.neo4j.com).
  When using this code in your own project, you should remove the examples below and use your own queries.
*/
export async function runRecoQuery(query: string) {
  const reco = [];
  try {
    let { records } = await driver.executeQuery(query);
    for (let record of records) {
      reco.push({
        id: record.get('id'),
        genres: record.get('genres'),
        year: record.get('year'),
        imdbRating: record.get('imdbRating'),
        languages: record.get('languages'),
        title: record.get('title'),
        plot: record.get('plot'),
        poster: record.get('poster'),
      });
    }

    return reco;
  } catch (err) {
    console.error(`Disconnection error\n${err}\nCause: ${err as Error}`);
    return false;
  }
}
