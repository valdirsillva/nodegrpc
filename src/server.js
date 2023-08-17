import path from 'path';

import { fileURLToPath } from 'url';
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from '@grpc/proto-loader';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const users = [
  { id: '1', name: 'Valdir', email: 'valdirpiresba@gmail.com' },
  { id: '2', name: 'Maria', email: 'maria@hotmail.com' },
  { id: '3', name: 'Angelica', email: 'angelica@gmail.com' }
]

const PROTO_PATH = path.resolve(__dirname, './protos/users.proto')
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
})

const usersProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

const findUserById = (id) => {
  const user = users.find(user => user.id === id);
  return user;
}

server.addService(usersProto.UserService.service, {
  list: (_, callback) => {
    const response = { users: users }; 
    callback(null, response);
  },

  getUser: (call, callback) => {
    const userId = call.request.id;
    const user = findUserById(userId)
    const response = { user: user }

    if (user) {
      callback(null, response);
    } else {
      callback({
        code: grpc.status.NOT_FOUND,
        details: 'Note not found',
      });
    }
  },
})

server.bindAsync('127.0.0.1:50051', grpc.ServerCredentials.createInsecure(), (err, port) => {
  if (err) {
    console.error('Error binding server:', err);
    return;
  }
  console.log(`Server running at http://127.0.0.1:${port}`);
  server.start();
});