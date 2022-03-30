import * as appsync from "@aws-cdk/aws-appsync-alpha";
import { Stack, StackProps, Expiration, Duration } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as path from "path";
import * as lambda from "aws-cdk-lib/aws-lambda";

export class BackendStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // GraphQL appsync API
    const api = new appsync.GraphqlApi(this, "GeoMapperApi", {
      name: "GeoMapperApi",
      schema: appsync.Schema.fromAsset(
        path.join(process.cwd(), "backend/schemas/address.graphql")
      ),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.API_KEY,
          apiKeyConfig: {
            expires: Expiration.after(Duration.days(365)),
          },
        },
      },
      xrayEnabled: false,
    });

    // Lambda function which extract addresses from text
    const func = new lambda.DockerImageFunction(this, "GeoMapperFunction", {
      code: lambda.DockerImageCode.fromImageAsset(
        path.join(process.cwd(), "backend/container")
      ),
      timeout: Duration.seconds(60),
    });

    const funcDS = api.addLambdaDataSource("GeoMapperDataSource", func);

    funcDS.createResolver({
      typeName: "Query",
      fieldName: "allAddresses",
      requestMappingTemplate: appsync.MappingTemplate.lambdaRequest(
        '{"arguments": $utils.toJson($context.arguments)}',
        "Invoke"
      ),
      responseMappingTemplate: appsync.MappingTemplate.lambdaResult(),
    });
  }
}
