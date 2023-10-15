import {Thread} from "@/types/thread";
import {Card, Image, Spin, Tag} from "antd";
import dayjs from "dayjs";
import Link from "next/link";
import ThreadHeader from "@/components/pages/forum/thread-header";
import AxiosClient from "@/api/axios-client";
import useVote from "@/hooks/use-vote";
import ProductPreview from "@/components/product-preview";

const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);
const ThreadItem = ({
                        id,
                        replies,
                        content,
                        user,
                        created_at,
                        replies_count,
                        attachment,
                        parent_id,
                        onVoted,
                        up_votes_count,
                        product_id,
                        tags,
                    }: Thread & { onVoted?: () => void }) => {
    const {handleVote, voting} = useVote({
        onVoted,
        id,
    })
    return (
        <div className={'bg-white'}>
            <div className={'px-4 py-2'}>
                <ThreadHeader avatar_url={user.avatar?.url || ''} name={user.name} created_at={created_at}
                              region_name={'Tasikmalaya, Jawa Barat'}/>
                <div className={'mt-[8px] font-bold tracking-[0.5px]'}>
                    {content}
                </div>
            </div>
            {
                attachment && (
                    <Image
                        width={'100%'}
                        height={400}
                        alt={''}
                        src={attachment.url}
                        className={'object-cover'}
                    />
                )
            }
            {
                !parent_id ? (
                    <div className={'p-4'}>
                        <div>
                            {
                                tags &&
                                (tags?.split(',')).map((tag, index) => (
                                    <Tag key={index} className={'border-blue-400 text-blue-400 rounded-full'}>{tag}</Tag>
                                ))
                            }
                        </div>
                        <div className={'grid grid-cols-3 gap-4 mt-2'}>
                            <div
                                className={'text-center bg-neutral-gray-100 text-neutral-gray-800 flex items-center justify-center py-2 rounded cursor-pointer'}
                                onClick={() => handleVote('up')}>
                                {
                                    voting ?
                                        <Spin/> :
                                        <>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd"
                                                      d="M22 11.9991C22 10.3166 20.8696 8.99908 19 8.99908H15.927L15.9548 8.92336C15.9826 8.84828 16.0607 8.64225 16.1367 8.44198L16.137 8.44122L16.137 8.44116L16.1371 8.44085C16.2044 8.26353 16.2699 8.09093 16.2971 8.01799C16.4872 7.50764 16.626 7.09644 16.7382 6.68921C16.9079 6.07372 17 5.5192 17 4.99909C17 3.52708 16.0919 2.6128 14.7483 2.22157C14.1423 2.04511 13.6148 1.99899 13 1.99908H12.5205L12.2203 2.37297C11.8811 2.79532 11.215 3.55651 10.447 4.43409L10.447 4.4341L10.447 4.43411C9.03024 6.05302 7.2669 8.06799 6.57035 9.08248C6.38961 9.0288 6.19817 8.99998 6 8.99998H4C2.89543 8.99998 2 9.89541 2 11V20C2 21.1045 2.89543 22 4 22H6C6.68712 22 7.29331 21.6535 7.65337 21.1257C7.95674 21.3219 8.29522 21.4856 8.66312 21.6173C9.50544 21.9186 10.3408 22.0112 11.0344 21.9985L18 21.9991C20.7551 21.9991 22 17.9427 22 11.9991ZM9.33688 19.7342C8.45197 19.4176 8 18.9013 8 17.9991V11V10.9991C8 10.7589 8.04443 10.5462 8.14171 10.3191C8.31645 9.91108 9.90193 8.10222 11.4047 6.38776L11.4048 6.3876C12.1803 5.50281 12.9338 4.64317 13.46 4.01422C13.7114 4.03307 13.9484 4.07171 14.1891 4.14182C14.7622 4.30868 15 4.54811 15 4.99909C15 5.31567 14.9359 5.7014 14.8101 6.15769C14.7161 6.49866 14.5944 6.85945 14.4229 7.31975C14.3986 7.38494 14.3381 7.54449 14.2737 7.71431L14.2733 7.71536L14.2731 7.71571L14.2729 7.71626C14.1943 7.9234 14.1101 8.14533 14.079 8.22963C13.9489 8.58125 13.8633 8.84015 13.8047 9.0754C13.5555 10.0754 13.8055 10.9991 15 10.9991H19C19.6912 10.9991 20 11.359 20 11.9991C20 16.7898 19.0151 19.9991 18 19.9991H11L10.9631 19.9997C10.5254 20.0075 9.91062 19.9394 9.33688 19.7342ZM4 20V11H6V20H4Z"
                                                      fill="#454646"/>
                                            </svg>
                                            {up_votes_count}
                                        </>
                                }
                            </div>
                            <Link href={`/threads/${id}`}>
                                <div
                                    className={'text-center bg-neutral-gray-100 text-neutral-gray-800 flex items-center justify-center py-2 rounded'}>
                                    <svg width="25" height="24" viewBox="0 0 25 24" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M6.5 21.8042L12.5868 18H20.5C21.6046 18 22.5 17.1046 22.5 16V4C22.5 2.89543 21.6046 2 20.5 2H4.5C3.39543 2 2.5 2.89543 2.5 4V16C2.5 17.1046 3.39543 18 4.5 18H6.5V21.8042ZM12.0132 16L8.5 18.1958V16H4.5V4H20.5V16H12.0132Z"
                                              fill="#454646"/>
                                    </svg>
                                    {replies_count}
                                </div>
                            </Link>
                            <div
                                className={'text-center bg-neutral-gray-100 text-neutral-gray-800 flex items-center justify-center py-2 rounded'}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                          d="M14 6C14 6.28742 14.0303 6.56777 14.0879 6.83801L9.01694 9.3735C8.28363 8.53189 7.20393 8 6 8C3.79086 8 2 9.79086 2 12C2 14.2091 3.79086 16 6 16C7.20393 16 8.28363 15.4681 9.01694 14.6265L14.0879 17.162C14.0303 17.4322 14 17.7126 14 18C14 20.2091 15.7909 22 18 22C20.2091 22 22 20.2091 22 18C22 15.7909 20.2091 14 18 14C16.7961 14 15.7164 14.5319 14.9831 15.3735L9.91208 12.838C9.96968 12.5678 10 12.2874 10 12C10 11.7126 9.96968 11.4322 9.91208 11.162L14.9831 8.6265C15.7164 9.46811 16.7961 10 18 10C20.2091 10 22 8.20914 22 6C22 3.79086 20.2091 2 18 2C15.7909 2 14 3.79086 14 6ZM8 12C8 13.1046 7.10457 14 6 14C4.89543 14 4 13.1046 4 12C4 10.8954 4.89543 10 6 10C7.10457 10 8 10.8954 8 12ZM18 8C19.1046 8 20 7.10457 20 6C20 4.89543 19.1046 4 18 4C16.8954 4 16 4.89543 16 6C16 7.10457 16.8954 8 18 8ZM20 18C20 19.1046 19.1046 20 18 20C16.8954 20 16 19.1046 16 18C16 16.8954 16.8954 16 18 16C19.1046 16 20 16.8954 20 18Z"
                                          fill="#454646"/>
                                </svg>
                                Bagikan
                            </div>
                        </div>
                    </div>
                ) : (
                    <></>
                )
            }
        </div>
    )
}


export default ThreadItem;