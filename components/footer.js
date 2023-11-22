import React from 'react'

export default function Footer() {
    return (
        <footer className="bottom-0">
            <div className='bg-gray-800 text-white'>
                <div className="container mx-auto px-4 py-12 flex flex-wrap justify-between text-sm lg:text-md">
                    <div>
                        <h4 className="font-bold">Links</h4>
                        <ul>
                            <li><a href="#">FAQ</a></li>
                            <li><a href="#">Help</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold">More Links</h4>
                        <ul>
                            <li><a href="#">Terms</a></li>
                            <li><a href="#">Privacy</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold">Social</h4>
                        <ul>
                            <li><a href="#">Facebook</a></li>
                            <li><a href="#">LinkedIn</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold">Company</h4>
                        <ul>
                            <li><a href="#">Blog</a></li>
                            <li><a href="#">About Us</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}
