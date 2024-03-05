
export default defineNuxtRouteMiddleware(async (to) => {
  const nuxtApp = useNuxtApp()
  // return nuxtApp.runWithContext(async () => {

    const { user, fetch: initUser } = useUserSession()
    console.log('auth middleware', user.value)
    
    if (!user.value) {
      try {
        
        await initUser()
      } catch (e) {
        console.log('auth middleware > catch :', e)
        throw e
      }
    }
    
    if(!!user.value) {
      return navigateTo(to)
    } else {
      return createError({ statusCode: 401 })
    }
  // })
})
