// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  authenticated: false,
  hmr: false,
  // api_url: 'http://reforge.localhost/api',
  // api_url: 'http://localhost:8200/api',
  api_url: 'https://api.poe.dev/api',
  // ws_url: 'ws://localhost:8200/ws/poe',
  // ws_url: 'ws://reforge.localhost/ws/poe',
  ws_url: 'wss://bo.poe.dev/ws/poe',
  poe_oauth2_url: '/poe-auth?code=21b0c5484f1d8d239a9d27600c5f8541790457a7&state=yourstate',
  discord_invite_url: 'https://discord.gg/nTGnxv4',
  version: '2.0.3',
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
