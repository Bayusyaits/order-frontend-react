import React from 'react'
import { NavLink } from 'react-router-dom'

import { PageGroup } from 'config/pageGroups'
import { generateElementId } from '../../../utils/generateElementId'

import styles from './sidebarItem.module.css'

interface PageLinkProps {
  page: { name: string; path: string }
  onPageLinkClick: () => void
}

const PageLink: React.FC<PageLinkProps> = ({ page, onPageLinkClick }) => (
  <NavLink
    id={generateElementId('sidebar', page.name, 'link')}
    className={styles.pageLink}
    to={page.path}
    onClick={onPageLinkClick}
  >
    <span>{page.name}</span>
    <span className={styles.arrow}>➔</span>
  </NavLink>
)

interface Props {
  pageGroup: PageGroup
}

const Footer: React.FC<Props> = ({ pageGroup }) => {
  const Icon = pageGroup.icon
  const onPageLinkClick = () =>
    setTimeout(() => {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur()
      }
    }, 10)

  let listContent: React.ReactNode
  if ('pages' in pageGroup) {
    listContent = pageGroup.pages.map((page) => (
      <PageLink key={page.path} page={page} onPageLinkClick={onPageLinkClick} />
    ))
  } else if ('subgroups' in pageGroup) {
    listContent = (
      <div className={styles.subgroupFlexContainer}>
        {pageGroup.subgroups.map((subgroup) => (
          <div key={subgroup.name}>
            <span>{subgroup.name}</span>
            {subgroup.pages.map((page) => (
              <PageLink key={page.path} page={page} onPageLinkClick={onPageLinkClick} />
            ))}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.popout}>
        <div className={styles.name}>{pageGroup.name}</div>
        <div className={styles.pageList}>{listContent}</div>
      </div>
    </div>
  )
}

export default Footer
