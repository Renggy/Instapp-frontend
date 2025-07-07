
import cookies from '@/services/cookies';

export function authGuard(to, from, next) {
  const isAuthenticated = !!cookies.getToken();

  if (isAuthenticated) {
    next()
  } else {
    next({ name : 'signin'})
  }
}
