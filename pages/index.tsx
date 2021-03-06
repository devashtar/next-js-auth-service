import type { NextPage } from 'next'
import Head from 'next/head'

import Nav from '@components/Nav'
import Home from '@components/Home'
import globalStore from '@store/Global.store'
import { useEffect } from 'react'

const HomePage: NextPage = () => {
  useEffect(() => {
    globalStore.setIsLoading(false)
    globalStore.setTypeDisplayForm(0)
  }, [])
  return (
    <div>
      <Head>
        <title>Home</title>
        <meta name='keywords' content='NEXT JS, MUI, SASS, MOBX' />
        <meta name='author' content='Michael' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Nav />
      <Home />
    </div>
  )
}

export default HomePage
