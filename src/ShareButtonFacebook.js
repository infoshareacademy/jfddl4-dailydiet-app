import React from 'react'
import ShareButton from 'react-social-share-buttons'

const ShareButtonFacebook = () =>

    (<div>
        Hey, share me!
            <ShareButton
            compact
            socialMedia={'facebook'}
            url={"https://xkcd.com/1024/"}
            media={"https://imgs.xkcd.com/comics/error_code.png"}
            text="Sit by a lake"
        />
    </div>
    )

    export default ShareButtonFacebook