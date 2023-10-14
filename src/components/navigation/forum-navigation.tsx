import Link from "next/link";
import {useMemo} from "react";
import {useRouter} from "next/router";

export default function ForumNavigation(){
    const pathname = useRouter().pathname;
    const menus = useMemo(() => {
        return [
            {
                name: 'Terbaru',
                href: '/',
            },
            {
                name: 'Trending',
                href: '/trending',
            }
        ]
    }, [])

    const isActive = (href: string) => {
        return pathname === href;
    }
    return (
        <div className={'grid grid-cols-2'}>
            {
                menus.map((menu, index) => (
                    <Link href={menu.href} key={index} >
                        <div className={`text-center border-b-[4px] py-4 hover:bg-gray-100 ${isActive(menu.href) ? 'border-blue-400 text-blue-400': 'border-white'}`}>{menu.name}</div>
                    </Link>
                ))
            }
        </div>
    )
}