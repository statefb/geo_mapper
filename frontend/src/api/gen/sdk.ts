import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
import { ClientError } from 'graphql-request/dist/types';
import useSWR, { SWRConfiguration as SWRConfigInterface, Key as SWRKeyInterface } from 'swr';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Address = {
  __typename?: 'Address';
  geometry: Geometry;
  properties: Properties;
  type: Scalars['String'];
};

export type Geometry = {
  __typename?: 'Geometry';
  coordinates: Array<Scalars['Float']>;
  type: Scalars['String'];
};

export type Properties = {
  __typename?: 'Properties';
  fullname: Scalars['String'];
  id: Scalars['Int'];
  lat: Scalars['Float'];
  lng: Scalars['Float'];
  note?: Maybe<Scalars['String']>;
  surface: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  allAddresses: Array<Address>;
};


export type QueryAllAddressesArgs = {
  text: Scalars['String'];
};

export type GetAddressesQueryVariables = Exact<{
  text: Scalars['String'];
}>;


export type GetAddressesQuery = { __typename?: 'Query', allAddresses: Array<{ __typename?: 'Address', geometry: { __typename?: 'Geometry', coordinates: Array<number> }, properties: { __typename?: 'Properties', id: number, surface: string, fullname: string, lat: number, lng: number, note?: string | null } }> };

export type AddressFieldsFragment = { __typename?: 'Address', geometry: { __typename?: 'Geometry', coordinates: Array<number> }, properties: { __typename?: 'Properties', id: number, surface: string, fullname: string, lat: number, lng: number, note?: string | null } };

export const AddressFieldsFragmentDoc = gql`
    fragment AddressFields on Address {
  geometry {
    coordinates
  }
  properties {
    id
    surface
    fullname
    lat
    lng
    note
  }
}
    `;
export const GetAddressesDocument = gql`
    query getAddresses($text: String!) {
  allAddresses(text: $text) {
    ...AddressFields
  }
}
    ${AddressFieldsFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    getAddresses(variables: GetAddressesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetAddressesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAddressesQuery>(GetAddressesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getAddresses', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;
export function getSdkWithHooks(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  const sdk = getSdk(client, withWrapper);
  return {
    ...sdk,
    useGetAddresses(key: SWRKeyInterface, variables: GetAddressesQueryVariables, config?: SWRConfigInterface<GetAddressesQuery, ClientError>) {
      return useSWR<GetAddressesQuery, ClientError>(key, () => sdk.getAddresses(variables), config);
    }
  };
}
export type SdkWithHooks = ReturnType<typeof getSdkWithHooks>;