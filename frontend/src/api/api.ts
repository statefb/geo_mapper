import { GraphQLClient } from "graphql-request";
import { getSdkWithHooks } from "./gen/sdk";

let url = "";
let options = undefined;
if (process.env.REACT_APP_USE_MOCK === "true") {
  url = "";
} else {
  url = `https://${process.env.REACT_APP_APPSYNC_API_ID}.appsync-api.${process.env.REACT_APP_AWS_REGION}.amazonaws.com/graphql`;
  // "https://7we7bhac3nc6dp2vxhcrv6wmqi.appsync-api.ap-northeast-1.amazonaws.com/graphql";
  options = {
    headers: {
      "x-api-key": process.env.REACT_APP_APPSYNC_API_KEY || "",
    },
  };
}

export const sdk = getSdkWithHooks(new GraphQLClient(url, options));
