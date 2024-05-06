
import swaggerAutogen from 'swagger-autogen'

const doc = {
  info: {
    title: "TalkFlow",
    description: "Social Media Api",
  },
  host: "localhost:8000",
  schemes: ["http"],
};

const outputFile = "./swaggerdoc.json";
const endpointsFiles = ["./routes/*.js"];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log("Swagger documentation generated successfully.");
});