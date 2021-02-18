import Head from 'next/head'
import Meta from './Meta';
import Navbar from './Navbar'

function Layout({ children }) {
    return (
        <>
        {/* <Head>
            <title>Note App</title>
        </Head> */}
        <Meta/>
        <Navbar />
        {children}
        </>
    )
}

export default Layout;