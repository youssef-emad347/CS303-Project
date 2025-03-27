/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/cart` | `/cart`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/categories` | `/categories`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/home` | `/home`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/profile` | `/profile`; params?: Router.UnknownInputParams; } | { pathname: `/auth/login`; params?: Router.UnknownInputParams; } | { pathname: `/auth/signup`; params?: Router.UnknownInputParams; } | { pathname: `/components/AuthorCard`; params?: Router.UnknownInputParams; } | { pathname: `/components/AuthorDetails`; params?: Router.UnknownInputParams; } | { pathname: `/components/AuthorList`; params?: Router.UnknownInputParams; } | { pathname: `/components/BookCard`; params?: Router.UnknownInputParams; } | { pathname: `/components/BookDetails`; params?: Router.UnknownInputParams; } | { pathname: `/components/BookList`; params?: Router.UnknownInputParams; } | { pathname: `/components/SearchBar`; params?: Router.UnknownInputParams; } | { pathname: `/components/bottom_navigation`; params?: Router.UnknownInputParams; } | { pathname: `/screens/about`; params?: Router.UnknownInputParams; } | { pathname: `/screens/wishlist`; params?: Router.UnknownInputParams; } | { pathname: `/book/[id]`, params: Router.UnknownInputParams & { id: string | number; } };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tabs)'}/cart` | `/cart`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tabs)'}/categories` | `/categories`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tabs)'}/home` | `/home`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tabs)'}/profile` | `/profile`; params?: Router.UnknownOutputParams; } | { pathname: `/auth/login`; params?: Router.UnknownOutputParams; } | { pathname: `/auth/signup`; params?: Router.UnknownOutputParams; } | { pathname: `/components/AuthorCard`; params?: Router.UnknownOutputParams; } | { pathname: `/components/AuthorDetails`; params?: Router.UnknownOutputParams; } | { pathname: `/components/AuthorList`; params?: Router.UnknownOutputParams; } | { pathname: `/components/BookCard`; params?: Router.UnknownOutputParams; } | { pathname: `/components/BookDetails`; params?: Router.UnknownOutputParams; } | { pathname: `/components/BookList`; params?: Router.UnknownOutputParams; } | { pathname: `/components/SearchBar`; params?: Router.UnknownOutputParams; } | { pathname: `/components/bottom_navigation`; params?: Router.UnknownOutputParams; } | { pathname: `/screens/about`; params?: Router.UnknownOutputParams; } | { pathname: `/screens/wishlist`; params?: Router.UnknownOutputParams; } | { pathname: `/book/[id]`, params: Router.UnknownOutputParams & { id: string; } };
      href: Router.RelativePathString | Router.ExternalPathString | `/_sitemap${`?${string}` | `#${string}` | ''}` | `${'/(tabs)'}/cart${`?${string}` | `#${string}` | ''}` | `/cart${`?${string}` | `#${string}` | ''}` | `${'/(tabs)'}/categories${`?${string}` | `#${string}` | ''}` | `/categories${`?${string}` | `#${string}` | ''}` | `${'/(tabs)'}/home${`?${string}` | `#${string}` | ''}` | `/home${`?${string}` | `#${string}` | ''}` | `${'/(tabs)'}/profile${`?${string}` | `#${string}` | ''}` | `/profile${`?${string}` | `#${string}` | ''}` | `/auth/login${`?${string}` | `#${string}` | ''}` | `/auth/signup${`?${string}` | `#${string}` | ''}` | `/components/AuthorCard${`?${string}` | `#${string}` | ''}` | `/components/AuthorDetails${`?${string}` | `#${string}` | ''}` | `/components/AuthorList${`?${string}` | `#${string}` | ''}` | `/components/BookCard${`?${string}` | `#${string}` | ''}` | `/components/BookDetails${`?${string}` | `#${string}` | ''}` | `/components/BookList${`?${string}` | `#${string}` | ''}` | `/components/SearchBar${`?${string}` | `#${string}` | ''}` | `/components/bottom_navigation${`?${string}` | `#${string}` | ''}` | `/screens/about${`?${string}` | `#${string}` | ''}` | `/screens/wishlist${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/cart` | `/cart`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/categories` | `/categories`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/home` | `/home`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/profile` | `/profile`; params?: Router.UnknownInputParams; } | { pathname: `/auth/login`; params?: Router.UnknownInputParams; } | { pathname: `/auth/signup`; params?: Router.UnknownInputParams; } | { pathname: `/components/AuthorCard`; params?: Router.UnknownInputParams; } | { pathname: `/components/AuthorDetails`; params?: Router.UnknownInputParams; } | { pathname: `/components/AuthorList`; params?: Router.UnknownInputParams; } | { pathname: `/components/BookCard`; params?: Router.UnknownInputParams; } | { pathname: `/components/BookDetails`; params?: Router.UnknownInputParams; } | { pathname: `/components/BookList`; params?: Router.UnknownInputParams; } | { pathname: `/components/SearchBar`; params?: Router.UnknownInputParams; } | { pathname: `/components/bottom_navigation`; params?: Router.UnknownInputParams; } | { pathname: `/screens/about`; params?: Router.UnknownInputParams; } | { pathname: `/screens/wishlist`; params?: Router.UnknownInputParams; } | `/book/${Router.SingleRoutePart<T>}` | { pathname: `/book/[id]`, params: Router.UnknownInputParams & { id: string | number; } };
    }
  }
}
