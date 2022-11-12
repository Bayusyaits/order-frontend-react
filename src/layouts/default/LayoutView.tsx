import React from 'react'
import type { PropsWithChildren } from 'react'

import Snackbar from '../../components/snackbar'
import LoadingOverlay from '../../components/loadingOverlay'

import type { PropsFromSelector } from './layoutSelector'
import styles from './layout.module.css'

const TAG_NAME = import.meta.env.VITE_APP_VERSION

export interface ViewProps {
  handleSnackbarClose: (el: string) => void
}

type Props = ViewProps & PropsFromSelector

const LayoutView = ({children,
  loggedIn,
  isInIframe,
  handleSnackbarClose,
  isLoading,}: PropsWithChildren<Props>) => {
  const snackbar = (
    <Snackbar
      onClose={handleSnackbarClose}
    />
  )

  if (isInIframe) {
    return (
      <div className={loggedIn ? 'login' : 'content'}>
        {snackbar}
        {children}
      </div>
    )
  }
  if (loggedIn) {
    return (
      <>
        {snackbar}
        {isLoading && <LoadingOverlay />}
        <div className="wrapper">
          <div className="wrapper-box">
            <main className="content">
              <div className={styles.route} id='route'>
                {children}
              </div>
              <footer className={styles.footer}>
                {TAG_NAME && <div>{TAG_NAME}</div>}
                <span className={styles.copyright}>©2022 Bayu Syaits</span>
              </footer>
            </main>
          </div>
        </div>
      </>
    )
  }

  return (
    <div id="public">
      {snackbar}
      <div className="wrapper">
        <div className="wrapper-box">
          <main className="content">
            <div className={styles.route} id='route'>
              {children}
            </div>
            <footer className={styles.footer}>
              {TAG_NAME && <div>{TAG_NAME}</div>}
              <span className={styles.copyright}>©2022 Bayu Syaits</span>
            </footer>
          </main>
        </div>
      </div>
    </div>
  )
}

export default LayoutView
