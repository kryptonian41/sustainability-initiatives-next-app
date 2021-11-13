import React, { useCallback, useEffect, useState } from 'react'
import HamburgerIcon from 'assets/svgs/hamburger.svg'
import { Portal } from 'components/Utils'
import styles from './styles.module.css'
import { Button } from 'components/Button'
import clsx from 'clsx'
import { CSSTransition } from 'react-transition-group'
import Link from 'next/link'

export const MobileSubNav = () => {
  const [showNav, setShowNav] = useState(false)
  const toggleNav = useCallback(() => {
    setShowNav(value => !value)
  }, [])

  return (
    <div className={clsx("flex-1 flex justify-end")}>
      <HamburgerIcon className="w-14 cursor-pointer" onClick={toggleNav} />
      <Portal>
        <CSSTransition
          in={showNav}
          classNames="mobile-nav-overlay"
          timeout={300}
          unmountOnExit
        >
          <div
            className={styles.mobileNavBackgroundOverlay}
            onClick={toggleNav}
          ></div>
        </CSSTransition>
        <CSSTransition
          in={showNav}
          classNames="mobile-nav"
          timeout={300}
          unmountOnExit
        >
          <div className={styles.mobileSubNavList}>
            <h3 className="text-white text-4xl uppercase text font-thin">
              Menu
            </h3>
            <ul className="mt-10">
              <MobileSubNavListItem label="About Us" link="/about" />
              <MobileSubNavListItem label="Initiatives">
                <MobileSubNavListItem
                  label="Advocacy and Outreach"
                  link="/initiatives/advocacy-and-outreach"
                />
                <MobileSubNavListItem
                  label="Capacity Building"
                  link="/initiatives/capacity-building"
                />
                <MobileSubNavListItem
                  label="Research and Publication"
                  link="/initiatives/research-and-publication"
                />
                <MobileSubNavListItem
                  label="Other Activities"
                  link="/initiatives/other-activities"
                />
                check
              </MobileSubNavListItem>
              <MobileSubNavListItem label="Associates" link="/associates" />
              <MobileSubNavListItem label="Support" link="/support" />
              <MobileSubNavListItem label="Contact" link="/contact" />
              <MobileSubNavListItem label="Downloads" link="/downloads" />
            </ul>
            <div className="mt-20">
              <Button
                className={styles.contactButton}
                type="outline"
                label="GET IN TOUCH"
                light
              />
            </div>
          </div>
        </CSSTransition>
      </Portal>
    </div>
  );
}

interface MobileSubNavListItemProps {
  label: string,
  link?: string,
}

export const MobileSubNavListItem: React.FC<MobileSubNavListItemProps> = ({ label, children, link }) => {
  let _children: any = React.Children.toArray(children)
    .filter(child => (child as React.ReactElement).type === MobileSubNavListItem)

  _children = React.Children.map(_children, (child) => {
    return React.cloneElement(child, {
    })
  })

  const [showChildren, setShowChildren] = useState(false)

  return <li>
    <span className="flex items-center">
      <span>
        {
          link ?
            <Link href={link} >
              {label}
            </Link> : label
        }
      </span>
      {_children.length > 0 &&
        <span className={styles['mobileNav--caret']} onClick={() => setShowChildren(value => !value)} />
      }
    </span>
    {
      showChildren && <span className="block pl-3 mt-4">
        {_children}
      </span>
    }
  </li>
}