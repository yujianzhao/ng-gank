import {Injectable} from '@angular/core';
import * as PouchDB from 'pouchdb-browser';
PouchDB.plugin(require('pouchdb-upsert'));

declare namespace Configuration {
  interface CommonDatabaseConfiguration {
    /**
     * Database name.
     */
    name?: string;
    /**
     * Database adapter to use.
     *
     * If unspecified, PouchDB will infer this automatically, preferring
     * IndexedDB to WebSQL in browsers that support both (i.e. Chrome,
     * Opera and Android 4.4+).
     */
    adapter?: string;
  }

  interface LocalDatabaseConfiguration extends CommonDatabaseConfiguration {
    /**
     * Enables auto compaction, which means compact() is called after
     * every change to the database.
     *
     * Defaults to false.
     */
    auto_compaction?: boolean;
    /**
     * How many old revisions we keep track (not a copy) of.
     */
    revs_limit?: number;
    /**
     * WebSQL-only options: Specifies whether you want to use persistent or temporary storage.
     */
    size?: number;
  }

  interface RemoteRequesterConfiguration {
    /**
     * Time before HTTP requests time out (in ms).
     */
    timeout?: number;
    /**
     * Appends a random string to the end of all HTTP GET requests to avoid
     * them being cached on IE. Set this to true to prevent this happening.
     */
    cache?: boolean;
    /**
     * HTTP headers to add to requests.
     */
    headers?: {
      [name: string]: string;
    }
    username?: string;
    password?: string;
    /**
     * Enables transferring cookies and HTTP Authorization information.
     *
     * Defaults to true.
     */
    withCredentials?: boolean;
    /**
     * Disables automatic creation of databases.
     */
    skip_setup?: boolean;
  }

  interface RemoteDatabaseConfiguration extends CommonDatabaseConfiguration {
    ajax?: RemoteRequesterConfiguration;
  }

  type DatabaseConfiguration = LocalDatabaseConfiguration |
    RemoteDatabaseConfiguration;
}

@Injectable()
export class PouchDBService {
  private options: Configuration.LocalDatabaseConfiguration = {
    auto_compaction: true,
    size: 100,
  }
  public db = new PouchDB('gank', this.options);

  constructor() {
    this.createIndexes();
  }

  /* TODO: use map/reduce to create indexes */
  private createIndexes() {

  }

  private appendCollectionProperty(collection: string, doc: any) {
    if (doc.hasOwnProperty('collection')) {
      doc['__collection'] = doc.collection;
    }
    doc['collection'] = collection;
  }

  test(){
    this.insert('test', { msg: 'this is a test.' }).then((resp) => {
      this.read(resp.id).then((data: any) => {
        console.log(data);
        this.delete(data._id, data._rev);
      })
    });
  }

  insert(collection: string, doc: any): Promise<any> {
    this.appendCollectionProperty(collection, doc);
    return this.db.post(doc).then((resp) => {
      return resp;
    }).catch(this.handleError);
  }

  read(id: string): Promise<any> {
    return this.db.get(id).then((doc) => {
      return doc;
    }).catch(this.handleError);
  }

  delete(id: string, rev: string): Promise<any> {
    return this.db.remove(id, rev).then((resp) => {
      return resp;
    }).catch(this.handleError);
  }

  /* TODO: log error to server client log */
  private handleError (err: any) {
    console.error(err);
  }

}
