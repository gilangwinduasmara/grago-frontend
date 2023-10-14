import DefaultLayout from "@/components/layouts/default-layout";
import {Form} from "antd";
import LoginForm from "@/components/forms/login-form";
import {signIn, useSession} from "next-auth/react";
import AxiosClient from "@/api/axios-client";
import {useEffect, useState} from "react";
import axios from "axios";
import {useRouter} from "next/router";

export default function LoginPage(){
    const {data, status} = useSession();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const onFinish = async (values: any) => {
        setLoading(true);
        const response = await signIn('credentials', {...values, redirect: false});
        if(response?.ok){
            if(router.query.redirect){
                router.push(router.query.redirect as string);
            }else {
                router.push('/');
            }
        }else {
            // redirect to login page with error
            router.push({
                pathname: '/login',
                query: {
                    error: response?.error,
                    redirect: router.query.redirect as string || '/'
                }
            })
            setLoading(false)
        }
    }

    useEffect(() => {
        if(status === 'authenticated'){
            router.push(router.query.redirect as string || '/');
        }
        setLoading(status === 'loading');
    }, [status])
    return (
        <DefaultLayout>
            <div className={'container mx-auto max-w-xl'}>
                <div className={'py-24'}>
                    <Form form={form} layout={'vertical'} onFinish={onFinish}>
                        <LoginForm loading={loading}/>
                    </Form>
                </div>
            </div>
        </DefaultLayout>
    )
}