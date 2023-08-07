export const reducers = (state, { type, payload }) => {
  switch (type) {
    case 'checking':
      return {
        ...state,
        status: 'checking'
      }
    case 'not-authenticated':
      return {
        ...state,
        status: 'not-authenticated',
        user: {
          name: null,
          id: '',
          email: null,
          avatar: '',
          token: null,
          isAuthenticated: false
        }
      }
    case 'authenticated':
      return {
        ...state,
        status: 'authenticate',
        user: {
          name: payload.name,
          id: '',
          email: payload.email,
          avatar: '',
          token: payload.token,
          isAuthenticated: true
        }
      }
    default:
      break;
  }
}