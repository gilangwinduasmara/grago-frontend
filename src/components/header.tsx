import {Drawer, Image} from "antd";
import {useSession} from "next-auth/react";
import {useState} from "react";
import ProductPicker from "@/components/product-picker";
import Link from "next/link";

export default function Header(){
    const {data} = useSession();
    const [open, setOpen] = useState(false);
    const onClose = () => {
        setOpen(false);
    }
    return (
        <>
            <Drawer
                title="Grago"
                placement={'left'}
                closable={true}
                onClose={onClose}
                open={open}
                destroyOnClose={true}
            >
                <Link href={'/leaderboard'}>
                    <div className={'flex items-center gap-2'}>
                        <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.7127 12.8359H2.36715V10.2462L0 3.99973L5.56809 5.55304L8.85912 0.474098L11.9113 5.31118L18 3.99973L15.7127 10.2462V12.8359Z" fill="#454646"/>
                            <path d="M15.7 13.3855H2.30969V15.5259H15.7V13.3855Z" fill="#454646"/>
                        </svg>
                        Papan peringkat
                    </div>
                </Link>
            </Drawer>
            <div className={'bg-gray-100'}>
                <div className={'container mx-auto max-w-xl bg-white p-4'}>
                    <div className="flex items-center gap-2">
                        <div onClick={() => setOpen(true)}>
                            <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M20 2V0H0V2H20ZM20 6V8H0V6H20ZM20 12V14H0V12H20Z" fill="#454646"/>
                            </svg>
                        </div>
                        <div>
                            <Image
                                src={'/grago.png'}
                                width={100}
                                height={42}
                                alt={'Grago'}
                                preview={false}
                                className={'object-contain'}
                            />
                        </div>
                        <div className="flex items-center justify-end flex-grow gap-2">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M6.4493 17.2136C7.72556 18.0663 9.22603 18.5215 10.761 18.5214C11.7805 18.5242 12.7904 18.3248 13.7323 17.9347C14.3329 17.686 14.8981 17.3629 15.4153 16.9741C15.4561 17.0331 15.5028 17.0892 15.5553 17.1417L18.5588 20.1452C19.0309 20.6173 19.7963 20.6173 20.2684 20.1452C20.7405 19.6731 20.741 18.9072 20.2689 18.4351L17.2654 15.4317C17.2057 15.372 17.1414 15.3199 17.0736 15.2753C18.0092 13.967 18.5216 12.3904 18.5216 10.7609C18.5216 8.70259 17.7039 6.72857 16.2485 5.27312C14.793 3.81767 12.819 3 10.7607 3C8.70234 3 6.72832 3.81767 5.27286 5.27312C4.18755 6.35852 3.44847 7.74138 3.14907 9.24683C2.84968 10.7523 3.00342 12.3127 3.59085 13.7308C4.17828 15.1488 5.17303 16.3609 6.4493 17.2136ZM7.84046 6.38982C8.7049 5.8121 9.72124 5.50367 10.761 5.50356C12.1548 5.50514 13.4911 6.05949 14.4767 7.04502C15.4624 8.03055 16.0169 9.36679 16.0186 10.7606C16.0186 11.8003 15.7103 12.8167 15.1327 13.6812C14.5551 14.5457 13.7341 15.2195 12.7735 15.6175C11.8129 16.0154 10.7559 16.1195 9.73618 15.9167C8.71642 15.7139 7.7797 15.2133 7.04446 14.4781C6.30923 13.743 5.80849 12.8063 5.60558 11.7866C5.40267 10.7669 5.50669 9.70985 5.90449 8.74924C6.3023 7.78863 6.97601 6.96755 7.84046 6.38982Z" fill="#454646"/>
                            </svg>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="24 / notifications / bell">
                                    <path id="icon" fill-rule="evenodd" clip-rule="evenodd" d="M19 10C19 5.94082 16.7616 3.1235 13.8654 2.27771C13.7605 2.00636 13.5948 1.7541 13.3695 1.54243C12.5997 0.81919 11.4003 0.81919 10.6305 1.54243C10.4057 1.75364 10.2402 2.00525 10.1353 2.27592C7.23535 3.11803 5 5.92919 5 10C5 12.6339 4.46898 14.1098 3.48596 15.1793C3.32161 15.3582 2.87632 15.7678 2.57468 16.0453L2.57465 16.0453L2.57465 16.0453L2.5745 16.0454C2.43187 16.1766 2.32138 16.2783 2.28796 16.3119L2 16.604V20.0141H8.08798C8.29384 21.0761 8.87009 21.7867 9.9122 22.4226C11.1941 23.2049 12.8059 23.2049 14.0878 22.4226C15.0075 21.8614 15.6241 20.9989 15.8743 20.0141H22V16.604L21.712 16.3119C21.6817 16.2812 21.5757 16.1834 21.437 16.0555C21.1363 15.7781 20.6823 15.3592 20.5154 15.1769C19.5317 14.1024 19 12.6246 19 10ZM13.7367 20.0141H10.1786C10.3199 20.2769 10.5607 20.4754 10.954 20.7154C11.5963 21.1073 12.4037 21.1073 13.046 20.7154C13.3434 20.5339 13.5758 20.2937 13.7367 20.0141ZM19.0402 16.5274C19.2506 16.7573 19.7016 17.1774 20 17.4519V18.0141H4V17.4524C4.29607 17.1811 4.74843 16.7613 4.95849 16.5327C6.29422 15.0794 7 13.1178 7 10C7 6.21989 9.33277 4.01238 12 4.01238C14.6597 4.01238 17 6.23129 17 10C17 13.1078 17.706 15.07 19.0402 16.5274Z" fill="#454646"/>
                                </g>
                            </svg>
                            <div className="h-[1.5rem] w-[1.5rem] rounded-full bg-gray-300 overflow-hidden">
                                {
                                    (data?.user as any)?.avatar_url && (
                                        <Image
                                            src={(data?.user as any)?.avatar_url}
                                            width={24}
                                            height={24}
                                            alt={data?.user?.name || ''}
                                            preview={false}
                                            className={'object-cover'}
                                        />
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}