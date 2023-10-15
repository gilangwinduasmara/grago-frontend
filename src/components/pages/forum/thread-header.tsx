import dayjs from "dayjs";
import {Image} from "antd";

type ThreadHeaderProps = {
    name: string;
    created_at?: Date;
    region_name: string;
    avatar_url?: string;
}
export default function ThreadHeader({name, created_at, region_name, avatar_url}: ThreadHeaderProps){
    return (
        <div className="flex gap-2 items-center">
            <div className={'bg-blue-400 h-[2.4rem] w-[2.4rem] rounded-full overflow-hidden'}>
                {
                    avatar_url && (
                        <Image
                            src={avatar_url}
                            width={'100%'}
                            height={'100%'}
                            alt={name || ''}
                            preview={false}
                            className={'object-cover'}
                        />
                    )
                }
            </div>
            <div>
                <div className={'flex items-center gap-2'}>
                    <div className={'font-bold tracking-[0.5px]'}>{name}</div>
                    {
                        created_at && (
                            <>
                                <div>·</div>
                                <div className={'text-neutral-gray-700'}>{(dayjs() as any).to(dayjs(created_at))}</div>
                            </>
                        )
                    }
                </div>
                <div className={'text-neutral-gray-700 text-sm/[12px]'}>{region_name}</div>
            </div>
        </div>
    )
}