import Head from 'next/head'
export default function Meta() {
    return (
      <Head>
        {/* <link rel="manifest" href="/manifest.json" /> */}
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="shortcut icon" href="/notes-128x128.ico"/>
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <title>Note App</title>

      </Head>
    )
  }