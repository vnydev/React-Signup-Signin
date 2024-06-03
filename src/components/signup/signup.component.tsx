import React, {useEffect, useState} from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Alert } from "antd";
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
import {registerUser} from '../../services/auth.service'
import { SIGN_IN_TOKEN_COOKIE, PasswordRegex } from '../../common/constants'
import { User } from '../../interfaces/user.interface'

import "./singup.style.css";

const SignUp: React.FC = () => {

  const [error, setError] = useState<string>('')
  const [form] = Form.useForm();
  const [cookie, setCookie, removeCookie] = useCookies([SIGN_IN_TOKEN_COOKIE])
  const navigate = useNavigate()

  useEffect(() => {
    removeCookie(SIGN_IN_TOKEN_COOKIE)
    if (cookie && cookie[SIGN_IN_TOKEN_COOKIE]) {
      navigate('/home')
    }
  }, [cookie])

  const onFinish = async (values: User) => {
    try {
      const success = await registerUser(values)
      if(success && success.status === 201) {
        form.resetFields()
        navigate('/signin')
      }
    } catch(error: any) {
      setError(error?.response?.data?.message)
      // console.log('singup Error', error)
    }
  };

  const validateMessages = {
    required: 'The ${label} is required.',
    types: {
      email: 'The ${label} is not a valid email.',
    }
  };

  return (
    <div className="singup-container">
      {error && <Alert style={{margin: '2%', marginBottom: '5%'}} message={error} type="error" showIcon closable />}

      <Form
        form={form}
        name="signup"
        className="singup"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        validateMessages={validateMessages }
      >
        <Form.Item
          name="name"
          rules={[{ required: true }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Full Name"
            type="text"
          />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[{ required: true}]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
            type="email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              pattern: new RegExp(PasswordRegex, 'gm'),
              message: 'Password should have 1 letter, 1 number, 1 special character and min 8 length.'
            },
          ]}
        >
          {/* <Tooltip title="Password should be min 8 character long and have 1 number, 1 special character and 1 letter."> */}
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Password"
              // title="Password should be min 8 character long and have 1 number, 1 special character and 1 letter."
            />
          {/* </Tooltip> */}
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="singup-btn"
          >
            Sign Up
          </Button>
          Or <Link to='/signin' >Sign in </Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignUp;
