
import { Button, Form } from "react-bootstrap";
//import {Link } from 'react-router-dom'
import { React, useContext, useState, useEffect } from "react";
//import { AuthContext } from "../../../../context/auth.context.js";
import FriendService from "./../../services/friends.service"

export default function FollowBtn ({friend, addFriends}) {

    const [isFollowing, setIsFollowing] = useState(null);
    
    useEffect(() => {
        FriendService.checkIfFollowing(friend._id)
        .then((response)=>{
            console.log('HELLO CHECK IF FOLLOWING FROM THE DB: ', response.data)
            if(response.data === false) setIsFollowing(false)
            else setIsFollowing(true)
        })
        .catch((error) => console.log(error))
    }, []);

    const handleFollow = (e) => {
        e.preventDefault();
    
        FriendService.followFriend(friend._id)
          .then(() => {
            setIsFollowing(true)
            addFriends(friend)
          })
          .catch((err) => console.log("Unable to stablish the relationship", err))
      };
    
      const handleUnfollow = (e) => {
        e.preventDefault();
    
        FriendService.unfollowFriend (friend._id)
          .then(() => setIsFollowing(false))
          .catch((err) => console.log("Unable to break the relationship", err));
      };

    return(
        <>
        {isFollowing
        
          ?
          
            <Form onSubmit={handleUnfollow}>
              <Button variant="dark" type="submit" className="friendsBtn">
                Unfollow
              </Button>
            </Form>
          
          :
          
            <Form onSubmit={handleFollow}>
              <Button variant="dark" type="submit" className="friendsBtn">
                Follow
              </Button>
            </Form>
        }
          </>
    )
}