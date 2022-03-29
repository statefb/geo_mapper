import { graphql, GraphQLHandler } from "msw";

export const handlers = [
  graphql.query("getAddresses", (req, res, ctx) => {
    return res(
      ctx.data({
        allAddresses: [
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [139.703, 35.530713],
            },
            properties: {
              id: 13936767,
              surface: "川崎市川崎区宮本町1番地",
              fullname: "神奈川県川崎市川崎区宮本町1番地",
              lng: 139.703,
              lat: 35.530713,
              note: undefined,
            },
          },
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [139.71535, 35.528623],
            },
            properties: {
              id: 13926692,
              surface: "川崎区中島2-4-",
              fullname: "神奈川県川崎市川崎区中島二丁目4番",
              lng: 139.71535,
              lat: 35.528623,
              note: undefined,
            },
          },
        ],
      })
    );
  }),
];
