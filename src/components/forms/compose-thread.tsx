import {
    Button, Image,
    Input, Upload, UploadFile, UploadProps

} from 'antd';
import {useState} from "react";
import {UploadChangeParam} from "antd/lib/upload";
import AxiosClient from "@/api/axios-client";
import {useSession} from "next-auth/react";
type ComposeThreadProps = {
    onThreadSubmitted?: () => void;
}
export default function ComposeThread({onThreadSubmitted}: ComposeThreadProps){
    const [comment, setComment] = useState('');
    const [uploading, setUploading] = useState(false);
    const [submiting, setSubmiting] = useState(false);
    const [image, setImage] = useState<any | undefined>(undefined);
    const {
        data
    } = useSession()
    const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
        if (info.file.status === 'uploading') {
            setUploading(true);
            return;
        }
        if (info.file.status === 'done') {
            setUploading(false);
            setImage(info.file.response[0]);
        }
        if(info.file.status === 'error'){
            setUploading(false);
        }
    };

    const handleSubmit = async () => {
        setSubmiting(true);
        try {
            await AxiosClient.post(`/api/threads`, {
                content: comment,
                attachment: image?.id,
            });
            onThreadSubmitted?.();
            setComment('');
            setImage(undefined);
        }catch (e){

        }
        setSubmiting(false);
    }

    return (

        <div className="flex flex-col gap-4">
            {
                image && (
                    <div className={'flex justify-center'}>
                        <div className={'relative'}>
                            <Image
                                width={100}
                                height={100}
                                alt={''}
                                src={image.url}
                                className={'object-cover'}
                            />
                            <div className={'absolute -top-4 -right-4 text-red-400 cursor-pointer'} onClick={() => setImage(undefined)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-400">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                )
            }
            <div className={'flex gap-2'}>
                {
                    (data?.user as any)?.avatar_url &&
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
                }
                <div className={'w-full space-y-2'}>
                    <Input.TextArea placeholder={'Tulis postingan anda'} value={comment} onChange={(e) => setComment(e.target.value)}></Input.TextArea>
                    <div className="grid grid-cols-2 gap-2">
                        <Button className={'border-blue-600'} loading={uploading}>
                            <Upload
                                name="attachment"
                                showUploadList={false}
                                className={'border-blue-400'}
                                action={`${process.env.NEXT_PUBLIC_API_URL}/api/upload`}
                                onChange={handleChange}
                            >
                                <div className={'flex items-center gap-2 text-blue-600 font-bold'}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.93702 5.84538C7.00787 5.74688 7.08656 5.62631 7.18689 5.46372C7.22356 5.40431 7.32355 5.23934 7.39799 5.11653L7.4818 4.97841C8.31079 3.62239 8.91339 3 10 3H15V5H10C9.91327 5 9.6405 5.28172 9.1882 6.02159L9.11542 6.14154L9.11524 6.14183C9.04019 6.26566 8.93096 6.44589 8.88887 6.51409C8.76592 6.71332 8.66375 6.86988 8.56061 7.01326C8.11237 7.63641 7.66434 8 7 8H4C3.44772 8 3 8.44772 3 9V18C3 18.5523 3.44772 19 4 19H20C20.5523 19 21 18.5523 21 18V12H23V18C23 19.6569 21.6569 21 20 21H4C2.34315 21 1 19.6569 1 18V9C1 7.34315 2.34315 6 4 6H6.8162C6.84949 5.96194 6.8903 5.91033 6.93702 5.84538ZM17 8V6H19V4H21V6H23V8H21V10H19V8H17ZM12 18C9.23858 18 7 15.7614 7 13C7 10.2386 9.23858 8 12 8C14.7614 8 17 10.2386 17 13C17 15.7614 14.7614 18 12 18ZM12 16C13.6569 16 15 14.6569 15 13C15 11.3431 13.6569 10 12 10C10.3431 10 9 11.3431 9 13C9 14.6569 10.3431 16 12 16Z" fill="#1B77DF"/>
                                    </svg>
                                    Tambah Foto
                                </div>
                            </Upload>
                        </Button>
                    </div>
                </div>
            </div>
            <Button disabled={uploading} loading={submiting} onClick={handleSubmit} className={'bg-blue-600 text-white font-bold'} size={'large'}><span className={'text-white'}>Kirim</span></Button>
        </div>
    )
}