import React, { useContext, useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { BsFillSuitHeartFill } from 'react-icons/bs';
import { BsSuitHeart } from 'react-icons/bs';
import { AuthContext } from "../../Contexts/AuthProvider";
import { useForm } from "react-hook-form";

// import { FcLike } from 'react-icons/fc';
// import { FcLike } from 'react-icons/fc';

const PostDetails = () => {
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

      
  const post = useLoaderData();
  const {user} = useContext(AuthContext)
  const [like,setLike] = useState(post.like)
  const [isActive, setIsActive] = useState(false);
  const commentName = user?.displayName;
  const likeHandler = () =>{
    setLike(isActive ? like - 1 : like + 1)
    setIsActive(!isActive)
  }

  const onSubmit = (data) =>{
    
    const comment = data.text;

    const PostDetails = {
        comment,
        userName:commentName,
        like,

    }
    fetch(`http://localhost:5000/posts/${post._id}`,{
        method:"PUT",
        headers:{
            'content-type':"application/json"
        },
        body:JSON.stringify(PostDetails)
    })
    .then(res => res.json())
    .then(result => {
      navigate('/media')
        console.log(result)
    })
  }
  return (
    <div className="flex  justify-center">
        <div className="card mt-12  shadow-2xl">
      <figure className="px-10 pt-10">
        <img
          style={{height:'300px'}}
          src={post.image}
          alt="Shoes"
          className="rounded-xl"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{post.name}</h2>
        <p>{post.status}</p>
        <span>{like} People liked this</span>
        <div className="card-actions">
          <div className="cursor-pointer text-2xl select-none">
       {isActive? <BsFillSuitHeartFill  onClick={likeHandler}/>:
      <BsSuitHeart onClick={likeHandler} />
           }
      </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
        <textarea className="mt-3"
             {...register("text")}
            rows="7"
            placeholder="Add a Comment"
            required
          ></textarea>
            {
              user?.uid ?
              <input className="btn btn-info" type="submit" /> :
                 <Link to='/login'><button className="btn btn-outline btn-error">Login to post</button></Link>
            }
        </form>
      </div>
    </div>
    </div>
  );
};

export default PostDetails;
