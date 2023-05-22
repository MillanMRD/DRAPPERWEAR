// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// ng build --output-hashing=all

/*
    cambie aqui su cliente ID de paypal
*/

/*
export const environment = {
  production: false,
  clientId: 'AYvU7p49APJ3TWCP7EPq6Z1Sm7LijDirPdDI-G6DjNasJ2tyIVCwb0IZL1v5cKy_tw7qPr_2ybS62gCR',
  imgURL: "https://drapperwear.es/storage/products",
  apiURL: "https://drapperwear.es/api"
};
*/

export const environment = {
  production: false,
  clientId: 'AYvU7p49APJ3TWCP7EPq6Z1Sm7LijDirPdDI-G6DjNasJ2tyIVCwb0IZL1v5cKy_tw7qPr_2ybS62gCR',
  imgURL: "http://localhost:8000/storage/products",
  apiURL: "http://localhost:8000/api"
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.