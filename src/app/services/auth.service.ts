import { Injectable } from '@angular/core';
import { Apollo, MutationResult, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import {
  AccessTokenTypes,
  LoginInputTypes,
  RegisterInputTypes
} from '../models/auth';

const LOGIN = gql`
  mutation Login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      accessToken
    }
  }
`;

const REGISTER = gql`
  mutation Register($registerInput: RegisterInput!) {
    register(registerInput: $registerInput) {
      accessToken
    }
  }
`;

const REFRESH_TOKEN = gql`
  mutation RefreshToken {
    refreshToken {
      accessToken
    }
  }
`;

const LOGOUT = gql`
  mutation Logout {
    logout
  }
`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private apollo: Apollo) {}

  login(
    loginInput: LoginInputTypes
  ): Observable<MutationResult<AccessTokenTypes>> {
    return this.apollo.mutate<AccessTokenTypes>({
      mutation: LOGIN,
      variables: {
        loginInput
      }
    });
  }

  register(registerInput: RegisterInputTypes) {
    return this.apollo.mutate<AccessTokenTypes>({
      mutation: REGISTER,
      variables: {
        registerInput
      }
    });
  }

  refreshToken() {
    return this.apollo.mutate<AccessTokenTypes>({
      mutation: REFRESH_TOKEN
    });
  }

  logout() {
    return this.apollo.mutate<AccessTokenTypes>({
      mutation: LOGOUT
    });
  }
}
