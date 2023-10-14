import DefaultLayout from "@/components/layouts/default-layout";
import {Form} from "antd";
import LoginForm from "@/components/forms/login-form";
import {signIn, useSession} from "next-auth/react";
import AxiosClient from "@/api/axios-client";
import {useEffect, useState} from "react";
import axios from "axios";
import {useRouter} from "next/router";
import RegisterForm from "@/components/forms/register-form";

export default function LoginPage(){
    const {data, status} = useSession();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const onFinish = async (values: any) => {
        setLoading(true);
        try {
            const response = await AxiosClient.post(`/api/auth/register`, values);
            if(response.status === 200){
                // router.push('/login');
                await signIn('credentials', {...values, redirect: '/', callbackUrl: '/'});
            }
        }catch (e) {
            setLoading(false)
        }
        // await signIn('credentials', values);
    }

    // useEffect(() => {
    //     if(status === 'authenticated'){
    //         router.push('/forum');
    //     }
    //     setLoading(status === 'loading');
    // }, [status])
    return (
        <DefaultLayout>
            <div className={'container mx-auto max-w-xl'}>
                <div className={'py-24'}>
                    <Form form={form} layout={'vertical'} onFinish={onFinish}>
                        <RegisterForm loading={loading} form={form}/>
                    </Form>
                </div>
            </div>
        </DefaultLayout>
    )
}