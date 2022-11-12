import React from 'react'
import { Link } from 'react-router-dom'

import styles from './notFound.module.css'

const NotFoundView = () => (
  <div className={styles.container}>
    <div className={styles.text}>
      Page Not Found
    </div>
    <Link to="/">
      Back to home
    </Link>
  </div>
)

export default NotFoundView
