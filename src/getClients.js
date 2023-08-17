import { client } from "./client.js"

client.list({}, (error, response) => {
  if (!error) {
    console.log(response.users); 
  } else {
    console.error(error)
  }
})
