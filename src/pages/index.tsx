import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'
import Avatar from '@mui/material/Avatar'
import { useEffect, useState } from 'react'
const inter = Inter({ subsets: ['latin'] })
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic';
import { Header } from '@/components/Common/Header'
import { PaletteMode } from '@mui/material'
// const ComponentB = dynamic(() => import('@/components/Chats/Chats'));
// const ComponentA = dynamic(() => import('@/components/Chatbot/Chatbot'));
import {default as HomePages} from '@/components/Home/Home'
export default function Home() {

  return (
    <>
      <HomePages />
    </>
  )
}