/*
|--------------------------------------------------------------------------
| Import npm
|--------------------------------------------------------------------------
|
*/
import auth0 from 'auth0-js'

/*
|--------------------------------------------------------------------------
| auth0
|--------------------------------------------------------------------------
|
*/
export default {
  install: function(Vue, options) {
    let webAuth = new auth0.WebAuth({
      domain: options.config.VUE_APP_AUTH0_DOMAIN,
      clientID: options.config.VUE_APP_AUTH0_CLIENT_ID,
      redirectUri: options.config.VUE_APP_AUTH0_CALLBACK_URL,
      audience: `https://${options.config.VUE_APP_AUTH0_DOMAIN}/userinfo`,
      responseType: 'token id_token',
      scope: 'openid email'
    })

    let auth = new Vue({
      computed: {
        authenticated: function () {
          return this.isAuthenticated()
        }
      },
      methods: {
        login () {
          webAuth.authorize()
        },

        handleAuthentication () {
          webAuth.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
              this.setSession(authResult)
              // Reload window
              window.location.reload(true)
            } else if (err) {
              // alert(`Error: ${err.error}. Check the console for further details.`)
              console.log(`handleAuthentication () Error: ${err.error}. Check the console for further details.`)
              webAuth.authorize()
            }
          })
        },

        getUserInfo (param) {
          let userPromise = new Promise((resolve) => {
            this.verifyAuthentication((data) => {
              resolve(data[param])
            })
          })
          return userPromise
        },

        verifyAuthentication (callback) {
          // Options
          let options = {
            state: localStorage.getItem('state'),
            nonce: localStorage.getItem('nonce'),
            hash: 'access_token=' + localStorage.getItem('access_token') + '&expires_in=' + localStorage.getItem('expires_in') + '&token_type=Bearer&state=' + localStorage.getItem('state') + '&id_token=' + localStorage.getItem('id_token')
          };
          // Parse
          webAuth.parseHash(options, (err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
              callback(authResult.idTokenPayload)
            } else if (err) {
              // alert(`Error: ${err.error}. Check the console for further details.`)
              console.log(`verifyAuthentication () Error: ${err.error}. Check the console for further details.`)
              webAuth.authorize()
            }
          })
        },
        
        setSession (authResult) {
          // Set the time that the access token will expire at
          let expiresAt = JSON.stringify(
            authResult.expiresIn * 1000 + new Date().getTime()
          )
          localStorage.setItem('access_token', authResult.accessToken)
          localStorage.setItem('id_token', authResult.idToken)
          localStorage.setItem('state', authResult.state)
          localStorage.setItem('expires_in', authResult.expiresIn)
          localStorage.setItem('expires_at', expiresAt)
          localStorage.setItem('nonce', authResult.idTokenPayload.nonce)
        },

        logout () {
          // Clear access token and ID token from local storage
          localStorage.removeItem('access_token')
          localStorage.removeItem('id_token')
          localStorage.removeItem('state')
          localStorage.removeItem('expires_in')
          localStorage.removeItem('expires_at')
          localStorage.removeItem('nonce')
          webAuth.authorize()
        },

        isAuthenticated () {
          // Check whether the current time is past the
          // access token's expiry time
          let expiresAt = JSON.parse(localStorage.getItem('expires_at'))
          return new Date().getTime() < expiresAt
        }
      }
    })
    Vue.prototype.$auth = auth
  }
}
