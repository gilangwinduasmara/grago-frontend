import DefaultLayout from "@/components/layouts/default-layout";
import Link from "next/link";
import ComposeThread from "@/components/forms/compose-thread";
import {useSession} from "next-auth/react";
import {Button} from "antd";

export default function ComposeThreadPage(){
    const {status} = useSession()
    return (
        <DefaultLayout>
            <div className="container mx-auto my-4">
                <div className="max-w-xl mx-auto my-4 p-4">
                    <Link href={'/'} className={'flex items-center gap-4 text-sm/[14px] font-bold'}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="24 / arrows / arrow-left">
                                <path id="icon" fill-rule="evenodd" clip-rule="evenodd" d="M6.41424 13L12.7071 19.2929L11.2929 20.7071L2.58582 12L11.2929 3.29289L12.7071 4.70711L6.41424 11H21V13H6.41424Z" fill="black"/>
                            </g>
                        </svg>
                        <span className={''}>Kembali</span>
                    </Link>
                    <div className={'py-8'}>
                        {
                            status === 'authenticated' &&
                            <ComposeThread/>
                        }
                        {
                            status === 'unauthenticated' &&
                            (
                                <>
                                    <div className={'text-center text-lg font-bold text-neutral-gray-800'}>
                                        Anda belum login
                                    </div>
                                    <div className={'text-center text-sm text-neutral-gray-600'}>
                                        Silahkan login terlebih dahulu untuk mengakses seluruh fitur
                                    </div>
                                    <div className={'flex justify-center'}>
                                        <Link href={'/login'}>
                                            <Button>Login</Button>
                                        </Link>
                                    </div>
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
        </DefaultLayout>
    )
}