import React from 'react'
import { Associate } from 'utils/types'
import Modal, { ModalProps } from '.'
import sanitizeHtml from 'sanitize-html';
import { useBreakpointValue } from 'utils/hooks/useMediaQuery';

interface Props extends ModalProps {
  isOpen: boolean,
  associate: Associate,
  onClose: () => void,
}

const AssociateModal: React.FC<Props> = ({ isOpen, associate, onClose }) => {
  const width = useBreakpointValue({
    phone: '90vw',
    tablet: '75vw',
    laptop: '50vw',
  })
  return (
    <Modal isOpen={isOpen} onClose={onClose} >
      {associate &&
        <div className="p-6 bg-white mx-auto" style={{ width }}>
          <div className="text-2xl">{associate.name}</div>
          <div className="mt-4" dangerouslySetInnerHTML={{
            __html: sanitizeHtml(associate.description, {
              allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img'])
            })
          }}></div>
        </div>
      }
    </Modal>

  )
}

export default AssociateModal
