import React from 'react'
import ReactDOM from 'react-dom/client'
import moment from 'moment'
import App from './App'
import reportWebVitals from './reportWebVitals'
import 'normalize.css'
import 'moment/locale/zh-cn'
import 'antd/dist/antd.css'

moment.locale('zh-cn')

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
