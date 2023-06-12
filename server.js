const grpc = require("@grpc/grpc-js")
const protoLoader = require("@grpc/proto-loader")

const PROTO_FILE = "./service_def.proto"

const options = {
  keepCase: true,
  longs: String,
  defaults: true,
  oneofs: true,
}

const pkgDefs = protoLoader.loadSync(PROTO_FILE, options)

const userProto = grpc.loadPackageDefinition(pkgDefs)

// Create gRPC server
const server = new grpc.Server()

server.addService(userProto.UserService.service, {

  GetUser: (input, callback) => {
    try {
      callback(null,  {name: "Jhon Doe", age: 45})

    } catch(error) {
      callback(error, null)
    }
  },
})

server.bindAsync(
  //port to serve on
  "127.0.0.1:5000",
  grpc.ServerCredentials.createInsecure(),

  //server start callback 
  (error, port) => {
    console.log(`listening on port ${port}`);
    server.start()
  }
)