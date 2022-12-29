import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Trending = () => {

    const [trendingData, setTrendingData] = useState([])
    const [isLoading, setISLoading] = useState(false);

    useEffect(() =>{
        setISLoading(true)
         fetch('http://localhost:5000/posts')
         .then(res => res.json())
         .then(data => {
             setTrendingData(data)
             setISLoading(false)
         })
     },[])
    return (
        <div>
            <h2 className='text-center'>Now Trending!!!{trendingData.length}</h2>
            {
            isLoading ? <div className="flex items-center justify-center">
            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div> :
            <div className='grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3'>
            {
                trendingData.map(posts =><div key={posts._id} className="card shadow-2xl">
                <figure><img style={{height:"200px"}} src={posts.image} alt="images" /></figure>
                <div className="card-body">
                  <h2 className="card-title">
                    {posts.name}
                    <div className="badge badge-secondary">{posts.like} Likes!!!</div>
                  </h2>
                  <p>{posts.status}</p>
                  <div className="card-actions justify-end">
                  <Link to={`/posts/${posts._id}`}><button className="btn btn-outline ">See More</button></Link>
                  </div>
                </div>
              </div>)
            }
           </div>
           }
        </div>
    );
};

export default Trending;