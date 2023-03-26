import AuthCheck from '@/components/AuthCheck'
import Navbar from '@/components/Navbar'

export default function Home() {
    return (
        <>
            <AuthCheck>
                <Navbar />
            </AuthCheck>
        </>
    )
}