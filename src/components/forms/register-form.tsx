import {Button, Form, FormInstance, Image, Input, Upload, UploadFile, UploadProps} from "antd";
import {useRouter} from "next/router";
import { message } from 'antd';
import {RcFile, UploadChangeParam} from "antd/lib/upload";
import {useState} from "react";
import {LoadingOutlined, PlusOutlined} from "@ant-design/icons";
type RegisterFormProps = {
    loading?: boolean;
    form: FormInstance;
}

const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
};

export default function RegisterForm(props: RegisterFormProps){
    const {error} = useRouter().query
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState<any | undefined>(undefined);
    const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            props.form.setFieldsValue({avatar: info.file.response[0].id});
            setImage(info.file.response[0]);
        }
    };

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    return (
        <>
            {error && <p className={'text-red-500'}>{error}</p>}
            <Form.Item name={'avatar'} hidden>
                <Input />
            </Form.Item>
            <Form.Item label={'Foto Profil'} rules={[{ required: true }]} name={'avatar'}>
                <Upload
                    name="avatar"
                    listType="picture-circle"
                    className="avatar-uploader"
                    showUploadList={false}
                    action={`${process.env.NEXT_PUBLIC_API_URL}/api/upload`}
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                >
                    {
                        image ?
                            <div className={'rounded-full overflow-hidden h-[6rem] w-[6rem] position-relative'}>
                                <Image src={image.url} alt="avatar" width={'100%'} height={'100%'} />
                            </div> :
                            uploadButton
                    }
                </Upload>
            </Form.Item>
            <Form.Item
                label="Nama"
                name="name"
                rules={[{ required: true, message: 'Please input your name!' }]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
            >
                <Input type={'email'}/>
            </Form.Item>
            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input type={'password'}/>
            </Form.Item>
            <Button htmlType={'submit'} loading={props.loading}>Register</Button>
        </>
    )
}