import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import Navbar from '@/components/Navbar'
import { useContext } from 'react'
import { UserContext } from '@/lib/context'
import AuthCheck from '@/components/AuthCheck'

export default function Home() {
    return (
        <>
            
            <AuthCheck>

            <Navbar />
            </AuthCheck>
        </>
    )
}