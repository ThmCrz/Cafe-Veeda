import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import fbLogo from '../assets/icons/facebook.svg';
import igLogo from '../assets/icons/instagram.svg';
import twLogo from '../assets/icons/twitter.svg';
import logo from '../assets/images/Cafe Veeda Logo.jpg';

class Footer extends Component {
  render() {
    return (
      <footer className="bg-[#F8F8F8] text-[#4f5665]">
        <div className="global-px">
          <div className="py-5  md:py-20"></div>
          <div className="flex flex-col-reverse gap-12 md:flex-row">
            <div className="flex flex-col gap-4 md:flex-[2_2_0%]">
              <Link to="/">
                <div className="font-extrabold flex flex-row gap-2">
                  <img src={logo} alt="logo" width="30px" />{" "}
                  <h1 className="text-xl text-black">Cafe Veeda</h1>
                </div>
              </Link>
              <div className="md:w-96">
              Cafe Veeda is a store that sells some good Drinks, and especially
                coffee. We provide high quality beans
              </div>
              <div className="flex flex-row gap-5">
                <a
                  href="https://www.facebook.com/profile.php?id=61553480067114"
                  target="https://www.facebook.com/profile.php?id=61553480067114"
                  className="bg-tertiary h-[35px] w-[35px] flex items-center justify-center rounded-full"
                
                >
                  <img src={fbLogo} alt="" />
                </a>
                {/* <a
                  href="#"
                  className="bg-tertiary h-[35px] w-[35px] flex items-center justify-center rounded-full"
                >
                  <img src={igLogo} alt="" />
                </a> */}
                {/* <a
                  href="#"
                  className="bg-tertiary h-[35px] w-[35px] flex items-center justify-center rounded-full"
                >
                  <img src={twLogo} alt="" width="120%" className="w-16" />
                </a> */}
              </div>
              <div className="copyright">(c) 2023 Cafe Veeda</div>
            </div>
            <nav className="flex flex-row gap-10 md:flex-1">
              <div className="flex-1 flex flex-col gap-5">
                <div className="grid-item">
                  <h4 className="font-bold">Product</h4>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="grid-item">
                    <a
                      href="https://"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {" "}
                      Download
                    </a>
                  </div>
                  <div className="grid-item">
                    <a
                      href="https://"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Pricing
                    </a>
                  </div>
                  <div className="grid-item">
                    <a
                      href="https://"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Locations
                    </a>
                  </div>
                  <div className="grid-item">
                    <a
                      href="https://"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Countries
                    </a>
                  </div>
                  <div className="grid-item">
                    <a
                      href="https://"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Blog
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-5">
                <div className="grid-item">
                  <h4 className="font-bold">Engage</h4>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="grid-item">
                    <a
                      href="https://"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Coffee Shop ?
                    </a>
                  </div>
                  <div className="grid-item">
                    <a
                      href="https://"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      FAQ
                    </a>
                  </div>
                  <div className="grid-item">
                    <a
                      href="https://"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      About Us
                    </a>
                  </div>
                  <div className="grid-item">
                    <a
                      href="https://"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Privacy Policy
                    </a>
                  </div>
                  <div className="grid-item">
                    <a
                      href="https://"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Terms of Services
                    </a>
                  </div>
                </div>
              </div>
            </nav>
          </div>
          <div className="py-5"></div>
        </div>
      </footer>
    );
  }
}

export default Footer;
