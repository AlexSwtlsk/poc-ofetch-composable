import { ofetch } from 'ofetch'

const config = useRuntimeConfig()
const accessToken = useCookie('access_token')

const pocFetch = ofetch.create({
  // baseURL: (process.client ? '' : process.env.NEXTAUTH_DEFAULT_CALLBACK_URL) + '/api',
  baseURL: (process.client ? '' : config.public.authCallbackUrl) + '/api',
  credentials: 'include',
  ...accessToken.value && {
    headers: {
      // need cookies !
      Authorization: `bearer ${accessToken.value}`,
    },
  },

  onRequest(context) {
    console.log('context', process.server, context)
  },
  onResponseError({ response }) {
    if (response.status === 401) {
      console.log('need refresh')
    }
  },
})

export default pocFetch
