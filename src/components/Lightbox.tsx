import Modal from 'react-modal';
import { Photo } from "../interfaces";
import '../App.css'


type Props = {
  photo: Photo | null;
  isModalOpen: boolean;
  closeModal: () => void;
}

const Lightbox: React.FC<Props> = ({
  photo,
  isModalOpen,
  closeModal,
}) => {
  if (!photo) {
    return null;
  }
  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      contentLabel={photo.title}
      className="photo-wrapper"
    >
      <div className='photo-main' onClick={closeModal}>
      <div className='photo-content'>
        <img alt={photo?.title} max-width="90vw" src={`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_c.jpg`} />
      </div>
    </div>
    </Modal>
  );
}
export default Lightbox;
