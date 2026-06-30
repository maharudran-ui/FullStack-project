import React, { useState } from "react";
import { Container } from "react-bootstrap";
import "../styles/ContactUs.css";
import CategoriesBar from "../components/common/CategoriesBar";



function ContactUs() {
    const [activeCategory, setActiveCategory] =
  useState("");

 
  return (
    <div className="contact-page">
      <Container>

           <CategoriesBar activeCategory={activeCategory} setActiveCategory={setActiveCategory}/>

        <h4 className="contact-main-title">
          Contact Information
        </h4>

        <p className="contact-text">
          Pennymead Auctions and Books. Proprietor David Druett.
          VAT Reg. No. 355701208
        </p>

        <div className="contact-address">
          <p>1 Brewerton Street</p>
          <p>Knaresborough</p>
          <p>North Yorkshire</p>
          <p>HG5 8AZ</p>
        </div>

        <p className="contact-text">
          Telephone: 01423 865962
          {" "}
          E-mail:
          {" "}
          <a href="mailto:pennymead@aol.com">
            pennymead@aol.com
          </a>
        </p>

        <p className="contact-description">
          Pennymead Auctions/Books is a one man business which I started in
          1982. I trade from my home in Knaresborough and welcome customers
          by appointment.
        </p>

        <h2 className="terms-title">
          Terms and Conditions
        </h2>

        <h4 className="sub-heading">
          Terms of Business
        </h4>

        <p className="contact-description">
          All goods are described accurately and in good faith. Any found not
          to be as described may be returned for a full refund.
        </p>

        <h4 className="sub-heading">
          Shipping
        </h4>

        <p className="contact-description">
          Postage and packing are charged as an extra but this includes
          insurance cover while in transit.
        </p>

        <p className="contact-description">
          Stamps, covers and postcards have a flat rate postage charge.
          You may order as many as you wish and the charges will remain
          as follows:- Inland £1 Europe £2 Worldwide £2.50  <br/> <br/>

          On orders of books and maps I will advise the shipping cost having weighed the items.  
          This will be at cost + £1 for packing materials.  An invoice will then be sent for  the total amount.  If this proves unacceptable please advise and the order will be cancelled.
        </p>
<h4 className="sub-heading">Payment</h4>
  <p className="contact-description">
Payment can be made by credit or debit card (except AMEX) or by Sterling cheque or U.S. or Canadian dollar cheque or in Euros in cash.  (Credit card transactions 
are handled by Sage Pay directly - a link will be given to take you to their site)
  </p>
  <p className="contact-description">Cancellations</p>
  <p className="contact-description">Orders may be cancelled without penalty before dispatch. Please send an e mail to let me know you have changed your mind.</p>
     
     <h4 className="sub-heading">Delivery</h4>
     <p className="contact-description">Orders will be dispatched within two working days of receipt of payment.</p>
     <h4 className="sub-heading">Privacy policy</h4>
     <p className="contact-description">This privacy policy sets out how pennymead.com uses and protects any information that you give pennymead.com when you use this website.</p>
      
     <p className="contact-description">Pennymead.com is committed to ensuring that your privacy is protected. Should we ask you to provide certain information by which you can be identified when <br/> using this website, then you can be assured that it will only be used in accordance with this privacy statement.</p>
<p className="contact-description">Pennymead.com may change this policy from time to time by updating this page. You should check this page from time to time to ensure that you are happy with  any changes. This policy is effective from 26 April 2012.</p>
 <p className="contact-description">What we collect</p>

<ul> We may collect the following information:
    <li>name and job title</li>
    <li>contact information including email address</li>
    <li>demographic information such as postcode, preferences and interests</li>
      <li>other information relevant to customer surveys and/or offers</li>
</ul>
 <p className="contact-description">What we do with the information we gather</p>
 <p className="contact-description">We require this information to understand your needs and provide you with a better service, and in particular for the following reasons:</p>
   <ul>
    <li>Internal record keeping.</li>
    <li>We may use the information to improve our products and services.</li>
    <li>We may periodically send promotional emails about new products, special offers or other information which we think you may find interesting using the email address which you have provided.</li>
   </ul>

   <h4 className="sub-heading">Security</h4>
   <p className="contact-description">We are committed to ensuring that your information is secure. In order to prevent unauthorised access or disclosure, we have put in place suitable physical, electronic and managerial procedures to safeguard and secure the information we collect online.</p>
<p className="contact-description">How we use cookies</p>
<p className="contact-description">A cookie is a small file which asks permission to be placed on your computer's hard drive. Once you agree, the file is added and the cookie helps analyse web traffic or lets you know when you visit a particular site. Cookies allow web applications to respond to you as an individual. The web application can tailor its operations to your needs, likes and dislikes by gathering and remembering information about your preferences.</p>

<p className="contact-description">We use traffic log cookies to identify which pages are being used. This helps us analyse data about web page traffic and improve our website in order to tailor it to customer needs. We only use this information for statistical analysis purposes and then the data is removed from the system.</p>
  
  <p className="contact-description">Overall, cookies help us provide you with a better website, by enabling us to monitor which pages you find useful and which you do not. A cookie in no way gives us access to your computer or any information about you, other than the data you choose to share with us.</p>
   <p className="contact-description">You can choose to accept or decline cookies. Most web browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer. This may prevent you from taking full advantage of the website.</p>
  <h4 className="sub-heading">Links to other websites</h4>
  <p className="contact-description">Our website may contain links to other websites of interest. However, once you have used these links to leave our site, you should note that we do not have any control over that other website. Therefore, we cannot be responsible for the protection and privacy of any information which you provide whilst visiting such sites and such sites are not governed by this privacy statement. You should exercise caution and look at the privacy statement applicable to the website in question.</p>
  
  <h4 className="sub-heading">Controlling your personal information</h4>
  <p className="contact-description">You may choose to restrict the collection or use of your personal information in the following ways:</p>
  <p className="contact-description">whenever you are asked to fill in a form on the website, look for the box that you can click to indicate that you do not want the information to be used by anybody for direct marketing purposes</p>
  <p className="contact-description">if you have previously agreed to us using your personal information for direct marketing purposes, you may change your mind at any time by writing to or emailing us at pennymead@aol.com</p>
  <p className="contact-description">We will not sell, distribute or lease your personal information to third parties.</p>
  <p className="contact-description">You may request details of personal information which we hold about you under the Data Protection Act 1998. A small fee will be payable. If you would like a copy of the information held on you please write to 1 Brewerton Street, Knaresborough, North Yorkshire, HG5 8AZ, UK.</p>
  <p className="contact-description">If you believe that any information we are holding on you is incorrect or incomplete, please write to or email us as soon as possible, at the above address. We will promptly correct any information found to be incorrect.</p>
   
   <h4 className="sub-heading">The town of Knaresborough</h4>
<p className="contact-description">The town of Knaresborough has plenty to offer visitors, particularly on warm summer days.  It makes a good base to explore the Yorkshire Dales and cities of York and Leeds.</p>
<p className="contact-description">I can recommend a good hotel and also a very good B. & B. both in Knaresborough town centre, also several good pubs.  </p>
<p className="contact-description">Callers are welcome to my home by appointment. </p>
<p className="contact-description">I have a small stock of books, prints and old postcards of Knaresborough for sale.</p>
      </Container>
    </div>
  );
}

export default ContactUs;