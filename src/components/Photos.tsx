import { getPhotoUrl } from "../constant";
import { Photo } from "../interfaces";

type Props = {
  photos: Photo[];
}

const Photos: React.FC<Props> = props => {
  

  // const handleClick = (photo: Photo) {
  //   // this.props.getPhoto(photo)
  //   // this.props.history.push(`${this.props.location.pathname}/${photo.id}`)
  // }

  // goBack() {
  //   this.props.history.goBack()
  // }
  const handleClick = (photo: Photo) => {
    console.log(photo)
  }
  
  if (props.photos.length === 0) return null;

    return (
    <div className="photos-container">
      {/* <div className="photos-back-link-wrapper" onClick={this.goBack.bind(this)}>
        <p className="text-link">Back to Album</p>
        </div> */}
      {props.photos?.map((photo) => (
        <div key={photo.id} className="photo-container" onClick={() => handleClick(photo)}>
          <img alt={photo.title} src={getPhotoUrl(photo)}/>
          <div className="photo-text-container">
            <p>{photo.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
export default Photos
