// import { Injectable } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { Strategy, VerifyCallback } from 'passport-google-oauth2';
//
// @Injectable()
// export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
//   constructor() {
//     super({
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SERVER,
//       callbackURL: process.env.GOOGLE_CALLBACK_URL,
//       scope: ['profile', 'email'],
//     });
//   }
//
//   async validate(
//     _accessToken: string,
//     _refreshToken: string,
//     profile: any,
//     done: VerifyCallback,
//   ): Promise<any> {
//     const { id, name, emails, photos } = profile;
//
//     const user = {
//       provider: 'google',
//       providerId: id,
//       email: emails[0].value,
//       name: `${name.givenName} ${name.familyName}`,
//       picture: photos[0].value,
//     };
//
//     done(null, user);
//   }
// }
