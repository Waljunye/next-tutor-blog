import React from 'react';
import styles from './styles/layout.module.css'
import Head from 'next/head';
import Image from 'next/image'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link';

const name = 'Matvey';
export const siteTitle = 'Next.js Sample Website';

// @ts-ignore
export default function Layout ({children, home}) {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                {home? (
                    <div>
                        <Image
                            priority
                            src='/images/profile.jpg'
                            className={utilStyles.borderCircle}
                            height={144}
                            width={144}
                            alt=''
                        />
                        <h1 className={utilStyles.heading2Xl}>{name}</h1>
                    </div>
                ):
                    <div>
                        <Link href='/'>
                            <Image
                                priority
                                src='/images/profile.jpg'
                                className={utilStyles.borderCircle}
                                height={108}
                                width={108}
                                alt=''
                            />
                        </Link>
                        <h2 className={utilStyles.headingLg}>
                            <Link href='/' className={utilStyles.colorInherit}>
                                {name}
                            </Link>
                        </h2>
                    </div>
                }
            </header>
            <main>{children}</main>
            {!home && (
                <div className={styles.backToHome}>
                    <Link href='/'> Back To Home</Link>
                </div>
            )}
        </div>)
}
