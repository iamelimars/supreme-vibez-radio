import React from 'react'
import Footer from '../landing/Footer'

const Terms = () => (
    <div style={styles.wrapper}>
        <div style={styles.container}>
            <h1 style={styles.title}>TERMS & CONDITIONS</h1>
            <p>Welcome to Supreme Vibez Radio & Entertainment Website.  Please read these Terms of Use before using any of the features on this site. Your use of our website constitutes your acceptance of these Terms of Use. If these Terms are not accepted in full, you do not have permission to access our Website, and the material contained therein, and your use of the Website should cease immediately. </p>
            {/* <br/> */}
            <p>If you are aged under eighteen years old  you must seek the permission of a parent or guardian before accessing or using our Website. </p>
            {/* <br/> */}
            <p>We reserve the right to change these Terms of Use at any time. It is the responsibility of the user to check these Terms to ensure that you agree to them, before using our Website.</p>
            <br/>
            <h3>Our Content</h3>
            <p>All material on this Website either belongs to or is licensed to us by our Affiliates, and should be treated as if belonging to us. Material on this Website must not be copied, reproduced, published or republished, posted, uploaded, distributed or transmitted, modified, manipulated or reverse engineered. Any use of the material on this site must be for personal, non-commercial use. </p>
            <p>Unauthorized use of material on this Website as detailed above constitutes a breach of copyright and associated intellectual property rights. </p>
            <br/>
            <h3>User Content</h3>
            <p>Where our Website requires you to register, you must provide accurate and complete information. It is your responsibility to ensure that such information is up to date, and we accept no liability in the case of out-of-date information. You must not divulge your password to anyone. Each registration is for one user only. If you have reason to believe that the security of your account has been affected, please contact us immediately. We reserve the right to contact you by email, as provided at the time of registration, regarding your use of any forums and other interactive areas of the Website. </p>
            <p>Users are asked not to:</p>
            <ul>
                <li>Use posts in the forums to advertise goods or services;</li>
                <li>Make posts or comments that are indecent, abusive, threatening, or infringe the copyright or other rights of third parties; </li>
                <li>Post messages which contain illegal or otherwise unlawful material;</li>
                <li>Post messages which contain viruses or code which may cause damage to another user’s computer software or equipment, or impair the functionality of the Website;</li>
                <li>Impersonate or misrepresent any third parties.</li>
            </ul>
            <p>We cannot guarantee the reliability, accuracy or impartiality of any messages posted, and as such we request that you do not rely in any way on anything posted on our Community Pages, and that you accept all risk associated with use of these Community Pages. Users should not rely upon any of the content of this Website as constituting advice, recommendations or agreements. </p>
            <p>We reserve the right to remove your registration if you do not comply with the above guidelines, in order to keep our Website safe and reliable for other users. </p>
            <br/>
            <h3>Third Party Content</h3>
            <p>Our Website includes certain material and content from third parties. Ownership of this third party content may or may not be obvious to the user, and as such users should treat all content on this website as if it were the intellectual property of Supreme Vibez Radio & Entertainment has no responsibility for the content and material from third parties. </p>
            <p>Users are asked to note that certain areas of our site are operated by third parties, and separate terms and conditions of use and privacy policies may apply to such sections. Please look out for these separate terms and policies. </p>
            <br/>
            <h3>Liabilities, warranties and indemnities</h3>
            <p>Our Website is provided on an ‘as is’ basis, without any express or implied warranty of any kind. We do not warrant that our Website will be error-free, or that any of the material therein is accurate. 
            We provide no warranty in respect of our sites, our content, our software or our services; we disclaim all liability connected with use of this Website to the extent permitted at law. Your use of this Website constitutes your acceptance to indemnify us against anything that arises out of a breach by you of these Terms of Use. 
            </p>
            <p>We are not liable to users of third party content, material or websites for inconsequential or incidental damages such as loss of profits or loss of privacy. We cannot be responsible for errors in any advertising or promotional material that appears on our Website, although we would be grateful if you would notify us, should you notice any errors in any such material. </p>
            <br/>
            <h3>General Legal Terms</h3>
            <p>Should any part of these Terms of Use be found to be invalid or otherwise unenforceable at law, then that part shall be severed from the Terms of Use to the extent that it is invalid or unenforceable, and its severance shall not affect the rest of these Terms of Use, which shall remain enforceable at law. </p>

            <Footer />
        </div>
    </div>
)

const styles = {
    wrapper: {
        display: 'flex',
        justifyContent: 'center',
        width: '100vw'
    },
    container: {
        padding: '45px',
        maxWidth: '900px'
    },
    title: {
        color: '#F95000'
    }
}

export default Terms