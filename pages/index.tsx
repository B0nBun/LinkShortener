import type { GetServerSideProps, NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { SiPrisma, SiTailwindcss, SiNextdotjs } from 'react-icons/si'
import DataSource from '../datasource'
import isUrlValid from '../utils/url-validator'

// TODO: Courusel
// TODO: Add actual text instead of placeholders
interface Section {
    icon : JSX.Element,
    header : string,
    text : JSX.Element
}

const sectionClasses = {
    next : `text-8xl transition-colors hocus-active:text-[#0070f3] focus:outline-none`,
    prisma : `text-8xl transition-colors hocus-active:text-[#7baeea] focus:outline-none`,
    tailwind : `text-8xl transition-colors hocus-active:text-[#0ea5e9] focus:outline-none`
} 

const sections : Section[] = [
    {
        header : 'Lorem ipsum',
        text : (
            <>
            Lorem ipsum dolor sit amet, <i>consectetur adipisicing elit.</i>
            Odit maiores blanditiis labore, voluptatem facilis nesciunt.
            </>
        ),
        icon : (
            <a target="_blank" href="https://nextjs.org/" className={sectionClasses.next}>
                <SiNextdotjs />
            </a>
        )
    },
    {
        header : 'Consectetur adipisicing',
        text : (
            <>
            Consectetur adipisicing elit. Soluta, voluptas!
            Sit amet consectetur <i>adipisicing elit</i>. Temporibus, molestiae?
            </>
        ),
        icon : (
            <a target="_blank" href="https://www.prisma.io/" className={sectionClasses.prisma}>
                <SiPrisma />
            </a>
        )
    },
    {
        header : 'Placeat in ad odit',
        text : (
            <>
            Placeat in ad <i>odit ex suscipit eum</i> magnam saepe blanditiis dicta,
            officia explicabo ratione adipisci minus cum accusamus <i>porro</i> rerum iusto quia!
            </>
        ),
        icon : (
            <a target="_blank" href="https://tailwindcss.com/" className={sectionClasses.tailwind}>
                <SiTailwindcss />
            </a>
        )
    }
]

interface Props {
    totalRedirects : number
}

// The timeout is not accurate at all, but on small numbers it's not that noticable
// e.g. 10 seconds tweening ends on 12th second
const useTweening = <T extends unknown>(valByProgress : (progress : number) => T, duration_ms : number) : T => {
    const [progress, setProgress] = useState(0)
    const inc = 1 / (duration_ms / 15)
    useEffect(() => {
        if (progress < 1) {
            setTimeout(() => setProgress(Math.min(1, progress + inc)), 15)
        }
    }, [progress])
    return valByProgress(progress)
}

const Home: NextPage<Props> = ({ totalRedirects }) => {
    const [error, setError] = useState('')
    const [url, setUrl] = useState('');
    const tweenedRedirects = useTweening(
        progress => Math.floor(progress * totalRedirects),
        1000
    )
    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        if (!isUrlValid(url)) {
            e.preventDefault()
            setError('Error: Invalid Url')
        }
    }
    
    return (
        <>
        <div className="flex flex-col items-center body-wrapper child:max-w-xl">
            <header className="flex flex-col items-center gap-4 py-10 relative">
                <div className="absolute h-full w-full top-0 left-0  child:rounded-full child:blur-md child:absolute child:mix-blend-multiply child:opacity-50 child:animate-blob">
                    <div className="w-32 h-32 bg-[#ffc1ff] -bottom-6 -right-8" style={{
                        animationDelay : '1500ms'
                    }}/>
                    <div className="w-48 h-48 bg-[#c4f9ff] top-0 -left-10" style={{
                        animationDelay : '4000ms'
                    }}/>
                    <div className="w-20 h-20 bg-[#b9e260] top-0 right-8" />
                </div>
                <h1 className="text-center font-bold tracking-wide z-10">Link Shortener</h1>
                <h3 className="text-center tracking-wide z-10">Make your URLs shorter</h3>
            </header>
            <span className="empty:h-0 h-[2em] px-5 overflow-y-hidden transition-[height] text-red rounded-sm">{error}</span>
            <form onSubmit={handleSubmit} method="POST" action="/add/" className="z-10 flex tablet:text-xl flex-col items-center gap-4 bg-red tablet:rounded-md w-full py-10 px-5 tablet:py-11 tablet:px-5">
                <div className="text-lg w-full relative">
                    {/* Placeholder opacity doesn't work for some reason  */}
                    <input
                        id="url-input"
                        name="url"
                        value={url}
                        onChange={e => setUrl(e.currentTarget.value)}
                        className="w-full peer placeholder-0 tablet:text-2xl"
                        type="text"
                        placeholder="URL"
                    />
                    <label
                        className={`absolute
                        tablet:text-2xl
                        
                        peer-placeholder-shown:top-1/2
                        peer-placeholder-shown:-translate-y-1/2
                        peer-placeholder-shown:left-1
                        peer-placeholder-shown:text-black
                        peer-placeholder-shown:opacity-60

                        peer-focus:-top-1/1
                        peer-focus:translate-y-1
                        peer-focus:left-1
                        peer-focus:text-white
                        peer-focus:opacity-100
                        
                        opacity-100
                        -top-1/1
                        translate-y-1
                        text-white
                        left-1
                        transition-all
                        `}
                        htmlFor="url-input"
                    >
                        URL
                    </label>
                </div>
                <button className="w-full transition-colors">Shorten</button>
            </form>
            <h1 className="font-bold mt-10 px-2 text-center text-2xl tablet:text-4xl">Total Redirects: {tweenedRedirects}</h1>
            <div className={`h-[4px] bg-red ${tweenedRedirects == totalRedirects ? 'w-full' : 'w-0'} transition-all duration-[1.5s] ease-in-out`} />
            <div className={`
                flex flex-col items-center
                tablet:flex-row tablet:max-w-7xl tablet:mt-10 tablet:child:flex-1 tablet:items-stretch
                gap-10 py-10 px-4 text-lg text-center`}>
                {
                    sections.map((sec, idx) => (
                        <section key={`section-${idx}`} className={`flex flex-col opacity-0 items-center tablet:justify-between gap-3 animate-[sectionfadein_.5s_ease-in-out_1]`} style={{
                            animationDelay : `${300 + 300 * idx}ms`,
                            animationFillMode : 'forwards'
                        }}>
                            <h3 className="font-bold text-xl">{sec.header}</h3>
                            <p className="italic-child:underline italic-child:decoration-red italic-child:decoration-2">{sec.text}</p>
                            {sec.icon}
                        </section>
                    ))
                }
            </div>
        </div>
        </>
    )
}

export const getServerSideProps : GetServerSideProps<Props> = async () => {
    return {
        props : {
            totalRedirects : await DataSource.getTotalRedirects()   
        }
    }
} 

export default Home
