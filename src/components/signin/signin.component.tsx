import React, {useEffect, useState} from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Alert } from "antd";
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { SIGN_IN_TOKEN_COOKIE } from '../../common/constants'
import { login } from '../../services/auth.service'
import { User } from '../../interfaces/user.interface'
import { decodeJwtToken } from '../../common/utility'

import './signin.style.css'

const SignIn: React.FC = () => {

  const [error, setError] = useState<string>('')
  const [form] = Form.useForm();

  const [cookie, setCookie] = useCookies<string>([SIGN_IN_TOKEN_COOKIE])

  const navigate = useNavigate()
  useEffect(() => {
    if (cookie && cookie[SIGN_IN_TOKEN_COOKIE]) {
      navigate('/home')
    }
  }, [cookie])

  const onFinish = async (values: User) => {
    try {
      setError('')
      const success = await login(values)

      if(success && success.accessToken) {
        const payload = decodeJwtToken(success.accessToken)
        const expData = new Date(payload.exp * 1000)

        setCookie(SIGN_IN_TOKEN_COOKIE, success.accessToken, {
          expires: expData,
        })
        form.resetFields()
        navigate('/home')
      }
    } catch(error: any) {
      setError(error?.response?.data?.message)
      // console.log('singin Error', error)
    }
  };

  const validateMessages = {
    required: "The ${label} is required.",
    types: {
      email: "The ${label} is not a valid email.",
    },
  };
  

  return (
    <div className="signin-container">
      {error && <Alert style={{margin: '2%', marginBottom: '5%'}} message={error} type="error" showIcon closable />}
      <Form
        form={form}
        name="normal_signin"
        className="signin"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item name="username" rules={[{ required: true }]}>
          <Input
            type="email"
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true }]}>
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="signin-btn"
          >
            Log in
          </Button>
          Or <Link to='/signup' >Sign Up </Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignIn;

