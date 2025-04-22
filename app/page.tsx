'use client'

import './home.css'
import { useState, useMemo } from 'react'

export default function Home() {
  const [formData, setFormData] = useState({
    mobile: '',
    code: ''
  })
  const [errors, setErrors] = useState({
    mobile: '',
    code: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isCodeButtonDisabled, setIsCodeButtonDisabled] = useState(true)

  const validateMobile = (mobile: string) => {
    if (!mobile) return '请输入手机号'
    if (!/^1[3-9]\d{9}$/.test(mobile)) return '手机号格式错误'
    return ''
  }

  const validateCode = (code: string) => {
    if (!code) return '请输入验证码'
    if (!/^\d{6}$/.test(code)) return '验证码格式错误'
    return ''
  }

  // 计算表单校验是否通过
  const isFormValid = useMemo(() => {
    return !validateMobile(formData.mobile) && !validateCode(formData.code)
  }, [formData.mobile, formData.code])

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setFormData(prev => ({ ...prev, mobile: value }))
    const error = validateMobile(value)
    setErrors(prev => ({ ...prev, mobile: error }))
    setIsCodeButtonDisabled(!!error)
  }

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setFormData(prev => ({ ...prev, code: value }))
    setErrors(prev => ({ ...prev, code: validateCode(value) }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isFormValid) return

    setIsSubmitting(true)
    try {
      // 实际业务的登录逻辑，此处先用Promise模拟
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log({
        mobile: formData.mobile,
        code: formData.code
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-item">
        <input 
          placeholder="手机号" 
          name="mobile" 
          value={formData.mobile}
          onChange={handleMobileChange}
        />
        {errors.mobile && <p className="form-error">{errors.mobile}</p>}
      </div>

      <div className="form-item">
        <div className="input-group">
          <input 
            placeholder="验证码" 
            name="code" 
            value={formData.code}
            onChange={handleCodeChange}
          />
          <button 
            className="getcode" 
            disabled={isCodeButtonDisabled}
            type="button"
            onClick={() => {
              alert('获取验证码成功')
            }}
          >
            获取验证码
          </button>
        </div>
        {errors.code && <p className="form-error">{errors.code}</p>}
      </div>

      <button 
        className="submit-btn" 
        type="submit" 
        disabled={!isFormValid || isSubmitting}
      >
        {isSubmitting ? 'submitting...' : '登录'}
      </button>
    </form>
  );
}
