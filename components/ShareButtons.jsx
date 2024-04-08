import { 
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  EmailIcon
 } from "react-share"

const ShareButtons = ({ property }) => {
  const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/property/${property._id}`

  return (
    <>
      <h3 className="text-xl font-bold text-center pt-2">Share This Property: </h3>
      <div className="flex gap-3 justify-center pb-5">
        {/* Facebook */}
        <FacebookShareButton url={shareUrl} quote={property.name} hashtag={`#${property.type}ForRent`}>
          <FacebookIcon size={40} round={true} />
        </FacebookShareButton>
        {/* Twitter */}
        <TwitterShareButton url={shareUrl} title={property.name} hashtags={[`#${property.type}ForRent`]}>
          <TwitterIcon size={40} round={true} />
        </TwitterShareButton>
        {/* Whatsapp */}
        <WhatsappShareButton url={shareUrl} title={property.name} separator=":: ">
          <WhatsappIcon size={40} round={true} />
        </WhatsappShareButton>
        {/* Email */}
        <EmailShareButton subject={property.name} body={`Check out this property on PropZilla:`} url={shareUrl}>
          <EmailIcon size={40} round={true} />
        </EmailShareButton>
      </div>
    </>
  )
}

export default ShareButtons