import Link from "next/link";
import ComposeThread from "@/components/forms/compose-thread";
import {Button, Image} from "antd";
import DefaultLayout from "@/components/layouts/default-layout";
import dayjs from "dayjs";
import {LegendaryBadge, JalaBadge} from "@/components/badges";

export default function LeaderboardPage(){
    const users = [
        {
            name: 'Pakde Rock',
            region: 'Bantul, DIY',
            avatar_url: '/a1.png',
            badges: [
                JalaBadge,
                LegendaryBadge,
            ],
            points: 5700,
        },
        {
            name: 'Agus Sholeh',
            region: 'Bulukumba, Sulawesi Selatan',
            avatar_url: '/a2.png',
            badges: [
                JalaBadge,
                LegendaryBadge,
            ],
            points: 5600,
        },
        {
            name: 'Hadi Bowo',
            region: 'Bantul, DIY',
            avatar_url: '/a3.png',
            badges: [
                LegendaryBadge,
            ],
            points: 5550,
        },
        {
            name: 'Sujono',
            region: 'Bulukumba, Sulawesi Selatan',
            avatar_url: '/a4.png',
            badges: [
                LegendaryBadge,
            ],
            points: 5300,
        },
        {
            name: 'Handoyo',
            region: 'Bantul, DIY',
            avatar_url: '/a5.png',
            points: 5231,
        },
        {
            name: 'Titisna',
            region: 'Bantul, DIY',
            avatar_url: '/a6.png',
            points: 5100,
        },
        {
            name: 'Kabayan',
            region: 'Bantul, DIY',
            avatar_url: '/a7.png',
            badges: [
                JalaBadge
            ],
            points: 5003,
        },
        {
            name: 'Nando Andika',
            region: 'Bantul, DIY',
            avatar_url: '/a8.png',
            points: 4999,
        },
        {
            name: 'Baron Dimas',
            region: 'Bantul, DIY',
            avatar_url: '/a9.png',
            badges: [
                JalaBadge
            ],
            points: 4900,
        },
        {
            name: 'Anjas Prasetyo',
            region: 'Bantul, DIY',
            avatar_url: '/a10.png',
            points: 4400,
        },
    ];
    return (
        <DefaultLayout>
            <div className="container mx-auto my-4">
                <div className="max-w-xl mx-auto my-4">
                    <Link href={'/'} className={'flex items-center gap-4 text-sm/[14px] font-bold px-3'}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="24 / arrows / arrow-left">
                                <path id="icon" fill-rule="evenodd" clip-rule="evenodd" d="M6.41424 13L12.7071 19.2929L11.2929 20.7071L2.58582 12L11.2929 3.29289L12.7071 4.70711L6.41424 11H21V13H6.41424Z" fill="black"/>
                            </g>
                        </svg>
                        <span className={''}>Papan Peringkat</span>
                    </Link>
                    <div className={'space-y-1 mt-1 bg-neutral-gray-100'}>
                        {
                            users.map((user, index) => (
                                <div key={index} className={'flex gap-2 items-center bg-white p-2 px-4'}>
                                    <div className={'bg-blue-400 h-[2.4rem] w-[2.4rem] rounded-full overflow-hidden'}>
                                        {
                                            user.avatar_url && (
                                                <Image
                                                    src={user.avatar_url}
                                                    width={'100%'}
                                                    height={'100%'}
                                                    alt={user.name || ''}
                                                    preview={false}
                                                    className={'object-cover'}
                                                />
                                            )
                                        }
                                    </div>
                                    <div className={'flex-grow'}>
                                        <div className={'flex items-center gap-2'}>
                                            <div className={'font-bold tracking-[0.5px]'}>{user.name}</div>
                                            {
                                                user?.badges && user?.badges?.map((Badge, index) => (
                                                    <Badge key={index} />
                                                ))
                                            }
                                        </div>
                                        <div className={'text-neutral-gray-700 text-sm/[12px]'}>
                                            {user.region}
                                            <span className={'text-blue-400 font-bold ps-2'}>{user.points} point</span>
                                        </div>
                                    </div>
                                    {
                                        index === 0 && (
                                            <svg width="24" height="36" viewBox="0 0 24 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M18.7127 15.3618H5.36715V12.7721L3 6.52563L8.56809 8.07894L11.8591 3L14.9113 7.83708L21 6.52563L18.7127 12.7721V15.3618Z" fill="#EB920D"/>
                                                <path d="M18.7 15.9114H5.30969V18.0518H18.7V15.9114Z" fill="#EB920D"/>
                                                <path d="M14.7295 27.89V29H9.92953V27.89H11.6875V22.832C11.6875 22.632 11.6935 22.426 11.7055 22.214L10.4575 23.258C10.3855 23.314 10.3135 23.35 10.2415 23.366C10.1735 23.378 10.1075 23.378 10.0435 23.366C9.98353 23.354 9.92953 23.334 9.88153 23.306C9.83353 23.274 9.79753 23.24 9.77353 23.204L9.30553 22.562L11.9515 20.312H13.1695V27.89H14.7295Z" fill="#EB920D"/>
                                                <rect x="0.5" y="0.5" width="23" height="35" rx="3.5" stroke="#EB920D"/>
                                            </svg>
                                        )
                                    }
                                    {
                                        index === 1 && (
                                            <svg width="24" height="36" viewBox="0 0 24 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M16.4751 14H7.5781V12.3241L6 8.28163L9.71206 9.28687L11.9061 6L13.9409 9.13035L18 8.28163L16.4751 12.3241V14Z" fill="#A09E9E"/>
                                                <path d="M14.4055 25.62C14.5655 25.62 14.6915 25.666 14.7835 25.758C14.8795 25.846 14.9275 25.964 14.9275 26.112V27H8.97553V26.508C8.97553 26.408 8.99553 26.304 9.03553 26.196C9.07953 26.084 9.14753 25.984 9.23953 25.896L11.8735 23.256C12.0935 23.032 12.2895 22.818 12.4615 22.614C12.6375 22.41 12.7835 22.208 12.8995 22.008C13.0155 21.808 13.1035 21.606 13.1635 21.402C13.2275 21.194 13.2595 20.976 13.2595 20.748C13.2595 20.54 13.2295 20.358 13.1695 20.202C13.1095 20.042 13.0235 19.908 12.9115 19.8C12.8035 19.692 12.6715 19.612 12.5155 19.56C12.3635 19.504 12.1915 19.476 11.9995 19.476C11.8235 19.476 11.6595 19.502 11.5075 19.554C11.3595 19.602 11.2275 19.672 11.1115 19.764C10.9955 19.852 10.8975 19.956 10.8175 20.076C10.7375 20.196 10.6775 20.328 10.6375 20.472C10.5695 20.656 10.4815 20.778 10.3735 20.838C10.2655 20.898 10.1095 20.912 9.90553 20.88L9.12553 20.742C9.18553 20.326 9.30153 19.962 9.47353 19.65C9.64553 19.334 9.85953 19.072 10.1155 18.864C10.3755 18.652 10.6715 18.494 11.0035 18.39C11.3395 18.282 11.6995 18.228 12.0835 18.228C12.4835 18.228 12.8495 18.288 13.1815 18.408C13.5135 18.524 13.7975 18.69 14.0335 18.906C14.2695 19.122 14.4535 19.382 14.5855 19.686C14.7175 19.99 14.7835 20.328 14.7835 20.7C14.7835 21.02 14.7355 21.316 14.6395 21.588C14.5475 21.86 14.4215 22.12 14.2615 22.368C14.1055 22.616 13.9215 22.856 13.7095 23.088C13.4975 23.32 13.2755 23.556 13.0435 23.796L11.0875 25.794C11.2755 25.738 11.4615 25.696 11.6455 25.668C11.8335 25.636 12.0115 25.62 12.1795 25.62H14.4055Z" fill="#A09E9E"/>
                                                <rect x="0.5" y="0.5" width="23" height="35" rx="3.5" stroke="#A09E9E"/>
                                            </svg>
                                        )
                                    }
                                    {
                                        index === 2 && (
                                            <svg width="24" height="36" viewBox="0 0 24 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M16.475 14H7.578V12.3241L7.57806 9.28687H9.71196L11.906 6L13.9408 9.13035H16.4751L16.475 12.3241V14Z" fill="#AA8952"/>
                                                <path d="M9.16753 20.742C9.22753 20.326 9.34353 19.962 9.51553 19.65C9.68753 19.334 9.90153 19.072 10.1575 18.864C10.4175 18.652 10.7135 18.494 11.0455 18.39C11.3815 18.282 11.7415 18.228 12.1255 18.228C12.5255 18.228 12.8855 18.286 13.2055 18.402C13.5295 18.514 13.8055 18.672 14.0335 18.876C14.2615 19.076 14.4355 19.312 14.5555 19.584C14.6795 19.856 14.7415 20.15 14.7415 20.466C14.7415 20.742 14.7095 20.986 14.6455 21.198C14.5855 21.406 14.4975 21.588 14.3815 21.744C14.2655 21.9 14.1215 22.032 13.9495 22.14C13.7775 22.248 13.5835 22.338 13.3675 22.41C13.8875 22.574 14.2755 22.824 14.5315 23.16C14.7875 23.496 14.9155 23.918 14.9155 24.426C14.9155 24.858 14.8355 25.24 14.6755 25.572C14.5155 25.904 14.2995 26.184 14.0275 26.412C13.7555 26.636 13.4395 26.806 13.0795 26.922C12.7235 27.038 12.3455 27.096 11.9455 27.096C11.5095 27.096 11.1295 27.046 10.8055 26.946C10.4815 26.846 10.1995 26.698 9.95953 26.502C9.71953 26.306 9.51553 26.066 9.34753 25.782C9.17953 25.498 9.03553 25.17 8.91553 24.798L9.56953 24.528C9.74153 24.456 9.90153 24.438 10.0495 24.474C10.2015 24.506 10.3115 24.586 10.3795 24.714C10.4515 24.854 10.5295 24.992 10.6135 25.128C10.7015 25.264 10.8055 25.386 10.9255 25.494C11.0455 25.598 11.1855 25.684 11.3455 25.752C11.5095 25.816 11.7035 25.848 11.9275 25.848C12.1795 25.848 12.3995 25.808 12.5875 25.728C12.7755 25.644 12.9315 25.536 13.0555 25.404C13.1835 25.272 13.2775 25.126 13.3375 24.966C13.4015 24.802 13.4335 24.638 13.4335 24.474C13.4335 24.266 13.4115 24.078 13.3675 23.91C13.3235 23.738 13.2315 23.592 13.0915 23.472C12.9515 23.352 12.7495 23.258 12.4855 23.19C12.2255 23.122 11.8755 23.088 11.4355 23.088V22.032C11.7995 22.028 12.1015 21.994 12.3415 21.93C12.5815 21.866 12.7715 21.778 12.9115 21.666C13.0555 21.55 13.1555 21.412 13.2115 21.252C13.2675 21.092 13.2955 20.916 13.2955 20.724C13.2955 20.316 13.1815 20.006 12.9535 19.794C12.7255 19.582 12.4215 19.476 12.0415 19.476C11.8655 19.476 11.7035 19.502 11.5555 19.554C11.4075 19.602 11.2735 19.672 11.1535 19.764C11.0375 19.852 10.9395 19.956 10.8595 20.076C10.7795 20.196 10.7195 20.328 10.6795 20.472C10.6115 20.656 10.5215 20.778 10.4095 20.838C10.3015 20.898 10.1475 20.912 9.94753 20.88L9.16753 20.742Z" fill="#AA8952"/>
                                                <rect x="0.5" y="0.5" width="23" height="35" rx="3.5" stroke="#AA8952"/>
                                            </svg>
                                        )
                                    }
                                    {
                                        index > 2 && (
                                            <div className={'font-bold text-sm pe-2'}>
                                                {index + 1}
                                            </div>
                                        )
                                    }
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </DefaultLayout>
    )
}