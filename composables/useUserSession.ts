
interface UserSession {
  user?: any
}

interface UserSessionComposable {
  status: ComputedRef<'authenticated' | null>
  user: Ref<any | null>
  session: Ref<UserSession>,
  fetch: Function
  clear: Function
}

const useSessionState = () => useState<UserSession>('session', () => ({
  user: null,
}))

export function useUserSession(): UserSessionComposable {
  const sessionState = useSessionState()
  return {
    status: computed(() => sessionState.value.user ? 'authenticated' : null),
    user: computed(() => sessionState.value.user || null),
    session: sessionState,
    fetch,
    clear,
  }
}

async function fetch() {
  try {
    // const { suspense } = useUser()
    // const res = await suspense()
    const res = await pocFetch<any>('v2/user/me')
    console.log('composables > session > fetch : data', res)
    useSessionState().value.user = res
    return res
  } catch (e) {
    console.log('composables > session > fetch : error', e)
    throw e
  }
}

async function clear() {
	useSessionState().value = {}
	useCookie('access_token').value = null
	useCookie('refresh_token').value = null
}
