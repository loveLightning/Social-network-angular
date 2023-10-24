import { Injectable } from '@angular/core';
import { Apollo, MutationResult, gql } from 'apollo-angular';
import { Observable, tap } from 'rxjs';
import {
  AccessTokenTypes,
  LoginInputTypes,
  RegisterInputTypes
} from '../models/auth';
import { StorageService } from './storage.service';

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
    refresh {
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
  constructor(
    private apollo: Apollo,
    private storageService: StorageService
  ) {}

  login(
    loginInput: LoginInputTypes
  ): Observable<MutationResult<{ login: AccessTokenTypes }>> {
    return this.apollo.mutate<{ login: AccessTokenTypes }>({
      mutation: LOGIN,
      variables: {
        loginInput
      }
    });
  }

  register(
    registerInput: RegisterInputTypes
  ): Observable<MutationResult<AccessTokenTypes>> {
    console.log(registerInput);
    return this.apollo
      .mutate<AccessTokenTypes>({
        mutation: REGISTER,
        variables: {
          registerInput
        }
      })
      .pipe(
        tap(({ data }) => {
          console.log('dsa');

          if (data?.accessToken) {
            this.storageService.setAccessToken(data.accessToken);
          }
        })
      );
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
