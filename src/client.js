import path from 'path';

import * as grpc from "@grpc/grpc-js";
import * as protoLoader from '@grpc/proto-loader';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROTO_PATH = path.resolve(__dirname, './protos/users.proto')
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
})

const UserService = grpc.loadPackageDefinition(packageDefinition).UserService;

const client = new UserService('localhost:50051', grpc.credentials.createInsecure())
    
export { client }