import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'
import Avatar from '@mui/material/Avatar'
import { useEffect, useState } from 'react'
const inter = Inter({ subsets: ['latin'] })
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic';
// const ComponentB = dynamic(() => import('@/components/Chats/Chats'));
const ComponentA = dynamic(() => import('@/components/Chatbot/Chatbot'));

export default function Home() {


  const router = useRouter()
  useEffect(() => {
    router.push('/auth/login')
  }, [])
  return (
    <>
      <div className={styles.fullBody}>
        <Avatar className={styles.myLogo} src='../static/images/logo.jpg' alt='' />
        <div className={styles.header2}>
          <h2 className='header'></h2>
          <div className={styles.childCompo}>
          </div>
        </div>
      </div>
    </>
  )
}
