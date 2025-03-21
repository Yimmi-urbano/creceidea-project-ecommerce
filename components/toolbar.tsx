
import React from "react";
import { Link } from "@nextui-org/react";
import { siteConfig } from "@/config/site";

export default function OptionsToolbar() {
    return (
        <>
            <div className="toolbar-footer ">
                <div className="toolbar-inner px-2 rounded-2xl border-1 border-[#d45900]/40 bg-orange-500/40 ">
                    <div className="flex item-wrap">
                        <div className="flex-1 group">
                            <Link href="/dashboard" className="text-white">
                                <span className="block">
                                    <svg width="27" height="26" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.9343 4.03304C13.2467 3.7255 13.7533 3.7255 14.0657 4.03304L23.3343 13.1568C23.6467 13.4644 24.1533 13.4644 24.4657 13.1568C24.7781 12.8493 24.7781 12.3507 24.4657 12.0432L15.197 2.91935C14.2598 1.99673 12.7402 1.99673 11.8029 2.91935L2.5343 12.0432C2.22188 12.3507 2.22188 12.8493 2.5343 13.1568C2.84672 13.4644 3.35325 13.4644 3.66567 13.1568L12.9343 4.03304Z" fill="#FAFAFA" />
                                        <path d="M13.5 5.70358L22.2029 14.2705C22.2346 14.3017 22.267 14.3319 22.3 14.361V20.8687C22.3 21.9561 21.4046 22.8375 20.3 22.8375H16.7C16.2582 22.8375 15.9 22.4849 15.9 22.05V17.325C15.9 16.8901 15.5418 16.5375 15.1 16.5375H11.9C11.4582 16.5375 11.1 16.8901 11.1 17.325V22.05C11.1 22.4849 10.7418 22.8375 10.3 22.8375H6.69999C5.59542 22.8375 4.69999 21.9561 4.69999 20.8687V14.361C4.73298 14.3319 4.76534 14.3017 4.79704 14.2705L13.5 5.70358Z" fill="#FAFAFA" />
                                    </svg>

                                    <span className="block text-xs">Inicio</span>

                                </span>
                            </Link>
                        </div>
                        <div className="flex-1 group">
                            <Link href="/dashboard/categories" className="text-white">
                                <span className="block">
                                    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14 16.875H17.375M17.375 16.875H20.75M17.375 16.875V13.5M17.375 16.875V20.25M6.5 10.5H8.75C9.99264 10.5 11 9.49264 11 8.25V6C11 4.75736 9.99264 3.75 8.75 3.75H6.5C5.25736 3.75 4.25 4.75736 4.25 6V8.25C4.25 9.49264 5.25736 10.5 6.5 10.5ZM6.5 20.25H8.75C9.99264 20.25 11 19.2426 11 18V15.75C11 14.5074 9.99264 13.5 8.75 13.5H6.5C5.25736 13.5 4.25 14.5074 4.25 15.75V18C4.25 19.2426 5.25736 20.25 6.5 20.25ZM16.25 10.5H18.5C19.7426 10.5 20.75 9.49264 20.75 8.25V6C20.75 4.75736 19.7426 3.75 18.5 3.75H16.25C15.0074 3.75 14 4.75736 14 6V8.25C14 9.49264 15.0074 10.5 16.25 10.5Z" stroke="#E5E7EA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>

                                    <span className="block text-xs">Categorías</span>

                                </span>
                            </Link>
                        </div>
                        <div className="flex-1 group">
                            <Link href="/dashboard/orders" className="text-white">
                                <span className="block">
                                <svg width="24px" height="26px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="5" y="4" width="14" height="17" rx="2" stroke="#ffffff"/>
                                <path d="M9 9H15" stroke="#ffffff" strokeLinecap="round"/>
                                <path d="M9 13H15" stroke="#ffffff" strokeLinecap="round"/>
                                <path d="M9 17H13" stroke="#ffffff" strokeLinecap="round"/>
                                </svg>

                                    <span className="block text-xs">Pedidos</span>

                                </span>
                            </Link>
                        </div>
                        <div className="flex-1 group">
                            <Link href="/dashboard/products" className="text-white">
                                <span className="block">
                                    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M21.5 7.5L12.5 2.25L3.5 7.5M21.5 7.5L12.5 12.75M21.5 7.5V16.5L12.5 21.75M3.5 7.5L12.5 12.75M3.5 7.5V16.5L12.5 21.75M12.5 12.75V21.75" stroke="#E5E7EA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>

                                    <span className="block text-xs">Productos</span>

                                </span>
                            </Link>
                        </div>
                        <div className="flex-1 group">
                            <Link href="/configuration/site" className="text-white">
                                <span className="block">
                                    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.0935 3.94013C10.1839 3.39767 10.6533 3.00008 11.2032 3.00008H13.7972C14.3471 3.00008 14.8165 3.39767 14.9069 3.94013L15.1204 5.22118C15.1827 5.59522 15.4327 5.90679 15.7645 6.09044C15.8386 6.13149 15.912 6.17391 15.9844 6.21765C16.3094 6.41392 16.7048 6.47494 17.0603 6.34173L18.2772 5.88585C18.7922 5.69292 19.3712 5.90058 19.6461 6.37685L20.9431 8.62329C21.2181 9.09955 21.1084 9.70481 20.6839 10.0543L19.6795 10.8812C19.387 11.122 19.242 11.4938 19.249 11.8726C19.2498 11.915 19.2502 11.9575 19.2502 12.0001C19.2502 12.0427 19.2498 12.0851 19.249 12.1275C19.242 12.5063 19.387 12.8782 19.6795 13.119L20.6839 13.9458C21.1084 14.2953 21.2181 14.9006 20.9431 15.3769L19.6461 17.6233C19.3712 18.0996 18.7922 18.3072 18.2772 18.1143L17.0603 17.6584C16.7048 17.5252 16.3094 17.5862 15.9844 17.7825C15.912 17.8262 15.8386 17.8687 15.7645 17.9097C15.4327 18.0934 15.1827 18.4049 15.1204 18.779L14.9069 20.06C14.8165 20.6025 14.3471 21.0001 13.7972 21.0001H11.2032C10.6533 21.0001 10.1839 20.6025 10.0935 20.06L9.88002 18.779C9.81768 18.4049 9.56771 18.0934 9.23594 17.9097C9.16176 17.8687 9.08844 17.8262 9.01601 17.7825C8.69098 17.5862 8.29565 17.5252 7.94008 17.6584L6.72322 18.1143C6.20822 18.3072 5.62923 18.0996 5.35426 17.6233L4.05728 15.3769C3.78231 14.9006 3.89196 14.2953 4.31654 13.9458L5.32089 13.119C5.6134 12.8782 5.7584 12.5064 5.75138 12.1275C5.7506 12.0852 5.7502 12.0427 5.7502 12.0001C5.7502 11.9575 5.7506 11.915 5.75138 11.8726C5.7584 11.4938 5.6134 11.122 5.32089 10.8812L4.31654 10.0544C3.89196 9.70482 3.78231 9.09957 4.05728 8.6233L5.35426 6.37686C5.62923 5.9006 6.20822 5.69293 6.72321 5.88587L7.94007 6.34174C8.29563 6.47495 8.69096 6.41393 9.016 6.21766C9.08843 6.17391 9.16176 6.1315 9.23594 6.09044C9.56771 5.90679 9.81768 5.59522 9.88002 5.22118L10.0935 3.94013Z" stroke="#E5E7EA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M15.5 12C15.5 13.6569 14.1568 15 12.5 15C10.8431 15 9.49997 13.6569 9.49997 12C9.49997 10.3431 10.8431 9 12.5 9C14.1568 9 15.5 10.3431 15.5 12Z" stroke="#E5E7EA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <span className="block text-xs">Sitio</span>

                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}



