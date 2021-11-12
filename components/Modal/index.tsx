import React from 'react'
import { CSSTransition } from 'react-transition-group'
import { Portal } from 'components/Utils'
import styles from './index.module.css'

export interface ModalProps {
  isOpen: boolean,
  onClose: () => void,
}

const Modal: React.FC<ModalProps> = ({ children, isOpen = false, onClose }) => {
  return (
    <Portal>
      <div className={styles['modal-container']}>
        <CSSTransition
          in={isOpen}
          classNames="overlay"
          timeout={300}
          unmountOnExit
          mountOnEnter
        >
          <div className="overlay" onClick={onClose}></div>
        </CSSTransition>
        <CSSTransition
          in={isOpen}
          classNames="root"
          timeout={{
            enter: 300,
            exit: 300,
          }}
          unmountOnExit
          mountOnEnter
        >
          <div className="root">
            {children}
          </div>
        </CSSTransition>
      </div>
    </Portal>
  )
}

export default Modal
