import React from "react";
import { GetAddressesQuery } from "../api/gen/sdk";

export type AddressActions = {
  type: "set";
  data: GetAddressesQuery;
};

export const addressReducer: React.Reducer<
  GetAddressesQuery,
  AddressActions
> = (state: GetAddressesQuery, actions: AddressActions) => {
  switch (actions.type) {
    case "set":
      return {
        ...actions.data,
      };
  }
};
