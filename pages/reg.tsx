import type { NextPage } from 'next'
import Head from 'next/head'
import Nav from '@components/Nav'
import Reg from '@components/Reg'
import { useEffect } from 'react'
import globalStore from '@store/Global.store'

const RegPage: NextPage = () => {
  useEffect(() => {
    globalStore.setIsLoading(false)
    globalStore.setTypeDisplayForm(1)
  }, [])
  return (
    <div>
      <Head>
        <title>Reg</title>
        <meta name='keywords' content='NEXT JS, MUI, SASS, MOBX' />
        <meta name='author' content='Michael' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Nav />
      <Reg />
    </div>
  )
}

export default RegPage
