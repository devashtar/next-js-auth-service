import type { NextPage } from 'next'
import Head from 'next/head'
import InputCode from '@components/InputCode'
import ParticlesWrapper from '@components/Particles'
import globalStore from '@store/Global.store'
import { useEffect } from 'react'

const ConfirmCodePage: NextPage = () => {
  useEffect(() => {
    globalStore.setIsLoading(false)
    globalStore.setTypeDisplayForm(0)
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

      <ParticlesWrapper />
      <InputCode />
    </div>
  )
}

export default ConfirmCodePage
