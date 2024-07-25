import Modal from 'react-modal';
import { Photo } from "../interfaces";

type Props = {
  photo: Photo;
  isModalOpen: boolean;
  closeModal: () => void;
}

const Lightbox: React.FC<Props> = ({
  photo,
  isModalOpen,
  closeModal,
}) => {
  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      contentLabel={photo.title}
    >
      <div className="photo-wrapper">
          <div className='photo-main'>
            <div className='photo-content'>
              <img alt={photo?.title} max-width="90vw" src={`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_c.jpg`} />
            </div>
          </div>
        </div>
    </Modal>
  );
}
export default Lightbox;
