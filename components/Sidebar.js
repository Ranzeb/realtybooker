import Link from "next/link";
export default function Sidebar(props) {
    return (
        <>
            <ul>
                <li>
                    <Link href="/settings/profile">Profile</Link>
                </li>
                <li>
                    <Link href="/settings/link">Link</Link>
                </li>
            </ul>

        </>
    )
}