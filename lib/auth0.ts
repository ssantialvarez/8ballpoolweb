import { Auth0Client } from '@auth0/nextjs-auth0/server';
import { NextResponse } from 'next/server';
import apiClient from './api/apiClient';
import { playerService } from './api/playerService';
import { env } from 'process';

export const auth0 = new Auth0Client({
  async onCallback(error, context, session) {
    if (error) {
      throw error;
    }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Accept", "application/json");

    var urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "client_credentials");
    urlencoded.append("client_id", env.AUTH0_CLIENT_ID || "");
    urlencoded.append("client_secret", env.AUTH0_CLIENT_SECRET || "");
    urlencoded.append("audience", "http://localhost:5234");

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded
    };

    const response = await fetch(`${env.AUTH0_DOMAIN}/oauth/token`, requestOptions)
      .then(response => response.json())
      .catch(error => console.log('error', error));

    if (response.access_token && session?.user) {
      await playerService.players.createPlayer(response.access_token, session.user);
    }

    // complete the redirect to the provided returnTo URL
    return NextResponse.redirect(
      new URL(context.returnTo || "/", process.env.APP_BASE_URL)
    );
  },
  authorizationParameters: {
    scope: "openid profile email",
    audience: "http://localhost:5234",
  },
})