/* eslint-disable no-console */
import neo4j, { Driver } from 'neo4j-driver';
import { nvlResultTransformer } from '@neo4j-nvl/base';
import { calcWordColor } from '@neo4j-devtools/word-color';

export let driver: Driver;

export async function setDriver(connectionURI: string, username: string, password: string) {
  try {
    driver = neo4j.driver(connectionURI, neo4j.auth.basic(username, password));
    await driver.getServerInfo();
    localStorage.setItem(
      'needleStarterKit-neo4j.connection',
      JSON.stringify({ uri: connectionURI, user: username, password: password })
    );
    return driver;
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

export async function runRAGQuery(sources: Array<string>) {
  // Customize the RETRIEVAL_QUERY to match your needs
  const formattedSources = sources.map((source) => `'${source}'`).join(', ');
  const RETRIEVAL_QUERY = `MATCH (a)-[r]->(b) WHERE elementId(a) IN [${formattedSources}] RETURN a, r, b LIMIT 25`;
  const nvlGraph = await driver.executeQuery(RETRIEVAL_QUERY, {}, { resultTransformer: nvlResultTransformer });
  const nodes = nvlGraph.nodes.map((node) => {
    const { properties, labels } = nvlGraph.recordObjectMap.get(node.id);
    return {
      ...node,
      caption: properties.name ?? labels[0],
      color: calcWordColor(properties.name ?? labels[0]),
    };
  });
  const relationships = nvlGraph.relationships.map((rel) => {
    const or = nvlGraph.recordObjectMap.get(rel.id);
    return {
      ...rel,
      caption: or.type,
    };
  });
  return { nodes, relationships };
}

export async function runQuery(query: string, driver: Driver, limit: number | boolean) {
  try {
    // Customize the RETRIEVAL_QUERY to match your needs
    let formattedQuery = `${query}`;
    if (typeof limit === 'number') {
      if (formattedQuery.trim().endsWith(';')) {
        formattedQuery = `${formattedQuery.trim().slice(0, -1)  } LIMIT ${limit};`;
      } else {
        formattedQuery += ` LIMIT ${limit}`;
      }
    }
    const nvlGraph = await driver.executeQuery(formattedQuery, {}, { resultTransformer: nvlResultTransformer });
    const nodes = nvlGraph.nodes.map((node) => {
      const { properties, labels } = nvlGraph.recordObjectMap.get(node.id);
      return {
        ...node,
        caption: properties.name ?? labels[0],
        color: calcWordColor(properties.name ?? labels[0]),
      };
    });
    const relationships = nvlGraph.relationships.map((rel) => {
      const or = nvlGraph.recordObjectMap.get(rel.id);
      return {
        ...rel,
        caption: or.type,
      };
    });
    return { nodes, relationships };
  } catch (err) {
    console.error(`Query error\n${err}\nCause: ${err as Error}`);
    return { error: (err as Error).message };
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
