import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { NgModule } from '@angular/core';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';

const uri = 'http://localhost:4000/graphql';

export function createApollo(httpLink: HttpLink): ApolloClientOptions<unknown> {
  return {
    link: httpLink.create({ uri, withCredentials: true }),
    cache: new InMemoryCache(),
    credentials: 'include'
  };
}

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink]
    }
  ]
})
export class GraphQLModule {}
