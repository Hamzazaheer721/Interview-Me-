import React from 'react'
import './home.css'
import {Link} from 'react-router-dom'

function Home({user, role}) {
    return (
        <div className="home_page">
            <h2>Hello everyone!</h2>
            {/* <p>
                This site is about user authentication, 
                so there won't be any other pages here. 
                If people want to see more about how to 
                create other websites. You can click on 
                the link below, visit my Github Profile. 
                
            </p>
            <a href="https://github.com/Hamzazaheer721" target="_blank" 
            rel="noopener noreferrer">Github</a> */}
            <Link to="/call">
                <button> Start Call! </button>
            </Link>
           
                {role ? 
                (<Link to="/dashboard">
                    <button> Make Quiz!</button>
                </Link>)    
                :(<Link to="/taketest">
                    <button> Give Quiz! </button>
                </Link>)    
            }
            

            
            
        </div>
    )
}

export default Home
