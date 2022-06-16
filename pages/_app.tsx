import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SiGithub } from 'react-icons/si'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
    <Component {...pageProps} />
    <footer className="fixed flex justify-between tablet:justify-start gap-10 p-3 tablet:px-16 tablet:py-5 text-sm tablet:text-md bg-black text-white text-opacity-80 bottom-0 w-full">
        <a href="/about-api">About API</a>
        <a className="flex items-center gap-1" target="_blank" href="https://github.com/B0nBun">
            BonBon <SiGithub className="text-lg translate-y-[1px]"/>
        </a>
    </footer>
    </>
  )
}

export default MyApp
