import {Button, Form, Input} from "antd";
import {useRouter} from "next/router";
import Link from "next/link";

type LoginFormProps = {
    loading?: boolean
}

export default function LoginForm(props: LoginFormProps){
    const {error} = useRouter().query
    return (
        <>
            {error && <p className={'text-red-500'}>{error}</p>}
            <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your username!' }]}
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
            <Button htmlType={'submit'} loading={props.loading}>Login</Button>
            <div className={'text-center'}>
                <div>
                    Belum punya akun?
                </div>
                <Link href={'/register'} className={'text-blue-400 font-bold'}>
                    Daftar
                </Link>
            </div>
        </>
    )
}