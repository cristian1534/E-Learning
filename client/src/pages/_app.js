import { UserProvider } from '@/context/UserProvider'
import '@/styles/globals.css'

// const Noop = ({ children }) => <>{children}</>;

export default function App({ Component, pageProps }) {

  const Auth = Component.Auth || (({ children }) => <>{children}</>);

  return (
    <UserProvider>
      <Auth>
        <Component {...pageProps} />
      </Auth>
    </UserProvider>
  )
}
export
