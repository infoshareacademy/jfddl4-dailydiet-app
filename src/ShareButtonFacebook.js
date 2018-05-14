import React from 'react'
import ShareButton from 'react-social-share-buttons'

const styles ={
    position: 'fixed',
    width: '10vw',
    padding: '0.2vw',
    height: '7vh',
    top: '60vh',
    left: '80vw',
    display: 'block',
    border: '5px solid rgb(59, 89, 152)',
    borderRadious: '15px'
    

}

const ShareButtonFacebook = () =>

    (<div style={styles}>
        {/* <h2 style={{color: 'rgb(59, 89, 152)', textAlign: 'center'}} >Don't Forget to share</h2> */}
            <ShareButton
            compact
            socialMedia={'facebook'}
            url={"https://app.dailydiet.jfddl4.is-academy.pl"}
            media={"https://imgs.xkcd.com/comics/error_code.png"}
            text="Thanks for sharing"
        />
    </div>
    )

    export default ShareButtonFacebook