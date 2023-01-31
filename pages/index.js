import Navbar from '@/components/Navbar'
import { useContext } from 'react'
import { UserContext } from '@/lib/context'
import AuthCheck from '@/components/AuthCheck'
import SetLink from '@/components/SetLink'
export default function Home() {
  const { user, username } = useContext(UserContext)

  return (
    <>
      <AuthCheck>
        <Navbar />
        <SetLink />
      </AuthCheck>
    </>
  )
}
