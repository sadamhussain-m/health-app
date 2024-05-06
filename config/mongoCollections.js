import {dbConnection} from './mongoConnection.js';

/* This will allow you to ha
ve one reference to each collection per app */
/* Feel free to copy and paste this this */
const getCollectionFn = (collection) => {
  let _col = undefined;

  return async () => {
    if (!_col) {
      
      const db = await dbConnection();
      _col = await db.collection(collection);
    }

    return _col;
  };
};

/* Now, you can list your collections here: 
NOTE: YOU WILL NEED TO CHANGE THE CODE BELOW AND UNCOMMENT IT TO HAVE THE COLLECTION(S) REQUIRED BY THE ASSIGNMENT */

//export const posts = getCollectionFn('posts');

export const users=getCollectionFn('users');

export const location=getCollectionFn('location');

export const provider=getCollectionFn('provider');

export const person=getCollectionFn('person');