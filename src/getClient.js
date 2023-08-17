import { client } from "./client.js"
const noteId = '2';

const request = {
  id: noteId,
};

client.getNote(request, (error, response) => {
  if (!error) {
    console.log(response); // The retrieved note
  } else {
    console.error(error);
  }
});