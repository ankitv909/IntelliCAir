// ** React Imports
import { ReactNode } from 'react'

// ** Next Imports
import Head from 'next/head'
import { Router } from 'next/router'
import type { AppProps } from 'next/app'

// ** Loader Import
import NProgress from 'nprogress'

// ** Emotion Imports
import { CacheProvider } from '@emotion/react'
import type { EmotionCache } from '@emotion/cache'

// ** Config Imports

import { defaultACLObj } from '@/configs/acl'
import themeConfig from '@/configs/themeConfig'

// ** Third Party Import
import { Toaster } from 'react-hot-toast'

// ** Component Imports
import UserLayout from '@/layouts/UserLayout'
import AclGuard from '@/@core/components/auth/AclGuard'
import ThemeComponent from '@/@core/theme/ThemeComponent'
import AuthGuard from '@/@core/components/auth/AuthGuard'
import GuestGuard from '@/@core/components/auth/GuestGuard'

// ** Spinner Import
import Spinner from '@/@core/components/spinner'

// ** Contexts
import { AuthProvider } from '@/context/AuthContext'
import { SettingsConsumer, SettingsProvider } from '@/@core/context/settingsContext'

// ** Styled Components
import ReactHotToast from '@/@core/styles/libs/react-hot-toast'

// ** Utils Imports
import { createEmotionCache } from '@/@core/utils/create-emotion-cache'

// ** Prismjs Styles
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'

// ** React Perfect Scrollbar Style
import 'react-perfect-scrollbar/dist/css/styles.css'

import '@/iconify-bundle/icons-bundle-react'

// ** Global css styles
import '@/styles/globals.css'
import {store} from "@/redux/store";
import {Provider} from "react-redux";

interface MyPageProps {
  contentHeightFixed: boolean;
}

// ** Extend App Props with Emotion
type ExtendedAppProps = AppProps & {
  Component: any
  emotionCache: EmotionCache
  pageProps: any;

}

type GuardProps = {
  authGuard: boolean
  guestGuard: boolean
  children: ReactNode
}


const clientSideEmotionCache = createEmotionCache()

// ** Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start()
  })
  Router.events.on('routeChangeError', () => {
    NProgress.done()
  })
  Router.events.on('routeChangeComplete', () => {
    NProgress.done()
  })
}

const Guard = ({ children, authGuard, guestGuard }: GuardProps) => {
  if (guestGuard) {
    return <GuestGuard fallback={<Spinner />}>{children}</GuestGuard>
  } else if (!guestGuard && !authGuard) {
    return <>{children}</>
  } else {
    return <AuthGuard fallback={<Spinner />}>{children}</AuthGuard>
  }
}

// ** Configure JSS & ClassName
const App = (props: ExtendedAppProps) => {
  const { Component, pageProps, emotionCache = clientSideEmotionCache } = props;
  /*Component, emotionCache = clientSideEmotionCache,session ,pageProps */

  // Variables
  const contentHeightFixed = Component.contentHeightFixed ?? false
  const getLayout =
    Component.getLayout ?? ((page: ReactNode) => <UserLayout contentHeightFixed={contentHeightFixed}>{page}</UserLayout>)

  const setConfig = Component.setConfig ?? undefined

  const authGuard = Component.authGuard ?? true

  const guestGuard = Component.guestGuard ?? false

  const aclAbilities = Component.acl ?? defaultACLObj

  return (
      <CacheProvider value={emotionCache}>
        <Provider store={store}>
          <Head>
            <title>{`${themeConfig.templateName}`}</title>
            <meta
                name='description'
                content={`${themeConfig.templateName}`}
            />
            <meta name='keywords' content={`${themeConfig.templateName}`} />
            <meta name='viewport' content='initial-scale=1, width=device-width' />
          </Head>

          <AuthProvider>
            <SettingsProvider {...(setConfig ? { pageSettings: setConfig() } : {})}>
              <SettingsConsumer>
                {({ settings }) => {
                  return (
                      <ThemeComponent settings={settings}>
                        <Guard authGuard={authGuard} guestGuard={guestGuard}>
                          <AclGuard aclAbilities={aclAbilities} guestGuard={guestGuard} authGuard={authGuard}>
                            {getLayout(<Component {...pageProps} />)}
                          </AclGuard>
                        </Guard>
                        <ReactHotToast>
                          <Toaster position={settings.toastPosition} toastOptions={{ className: 'react-hot-toast' }} />
                        </ReactHotToast>
                      </ThemeComponent>
                  )
                }}
              </SettingsConsumer>
            </SettingsProvider>
          </AuthProvider>
        </Provider>
      </CacheProvider>
     /* <SessionProvider session={session}>
      <CacheProvider value={emotionCache}>
        <Provider store={store}>
          <Head>
            <title>{`${themeConfig.templateName}`}</title>
            <meta
                name='description'
                content={`${themeConfig.templateName}`}
            />
            <meta name='keywords' content={`${themeConfig.templateName}`} />
            <meta name='viewport' content='initial-scale=1, width=device-width' />
          </Head>

          <AuthProvider>
            <SettingsProvider {...(setConfig ? { pageSettings: setConfig() } : {})}>
              <SettingsConsumer>
                {({ settings }) => {
                  return (
                      <ThemeComponent settings={settings}>
                        <Guard authGuard={authGuard} guestGuard={guestGuard}>
                          <AclGuard aclAbilities={aclAbilities} guestGuard={guestGuard} authGuard={authGuard}>
                            {getLayout(<Component {...pageProps} />)}
                          </AclGuard>
                        </Guard>
                        <ReactHotToast>
                          <Toaster position={settings.toastPosition} toastOptions={{ className: 'react-hot-toast' }} />
                        </ReactHotToast>
                      </ThemeComponent>
                  )
                }}
              </SettingsConsumer>
            </SettingsProvider>
          </AuthProvider>
        </Provider>
      </CacheProvider>
        </SessionProvider>*/
  )
}

export default App
