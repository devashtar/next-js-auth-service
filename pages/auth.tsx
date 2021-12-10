import type { NextPage } from 'next'
import Head from 'next/head'

import Nav from '@components/Nav'
import Auth from '@components/Auth'
import { useEffect } from 'react'
import globalStore from '@store/Global.store'

const AuthPage: NextPage = () => {
  useEffect(() => {
    globalStore.setIsLoading(false)
    globalStore.setTypeDisplayForm(2)
  }, [])
  return (
    <div>
      <Head>
        <title>Auth</title>
        <meta name='keywords' content='NEXT JS, MUI, SASS, MOBX' />
        <meta name='author' content='Michael' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Nav />
      <Auth />
    </div>
  )
}

export default AuthPage
