import { GraphQLClient } from "graphql-request";
import { getSdkWithHooks } from "./gen/sdk";

let url = "";
let options = undefined;
if (process.env.REACT_APP_USE_MOCK === "true") {
  url = "";
} else {
  url =
    "https://7we7bhac3nc6dp2vxhcrv6wmqi.appsync-api.ap-northeast-1.amazonaws.com/graphql";
  options = {
    headers: {
      "x-api-key": "da2-wez37mni7bb7bez3xppono4ecm",
    },
  };
}

export const sdk = getSdkWithHooks(new GraphQLClient(url, options));
