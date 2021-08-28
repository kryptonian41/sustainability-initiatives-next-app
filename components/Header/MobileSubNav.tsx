import React, { useState } from 'react'
import HamburgerIcon from 'assets/svgs/hamburger.svg'
import { Portal } from 'components/Utils'
import styles from './styles.module.css'
import { Button } from 'components/Button'
import clsx from 'clsx'
import { CSSTransition } from 'react-transition-group'

interface Props {

}

export const MobileSubNav = (props: Props) => {

  const [showNav, setShowNav] = useState(false)

  return (

    <div className={clsx("flex-1 flex justify-end", styles.mobileNavRoot)}>
      <HamburgerIcon className="w-14 cursor-pointer" onClick={() => setShowNav(value => !value)} />
      <Portal>
        <CSSTransition in={showNav} classNames="mobile-nav" timeout={300} unmountOnExit>
          <div className={styles.mobileSubNavList} >
            <h3 className="text-white text-4xl uppercase text font-thin underline">Menu</h3>

            <ul className="mt-10">
              <li>About Us</li>
              <li>Initiatives</li>
              <li>Associates</li>
              <li>Contact</li>
              <li>Downloads</li>
            </ul>

            <div className="mt-20">
              <Button className={styles.contactButton} type="outline" label="GET IN TOUCH" light />
            </div>
          </div>
        </CSSTransition>
      </Portal>

    </div>
  )
}


