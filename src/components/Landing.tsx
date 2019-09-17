import React, { useEffect, useState, useContext } from 'react';

import { SERVIDOR } from '../index';

//Context
import { AuthContext } from '../auth_context';

// components
import NewPost from './NewPost';
import Post from './Post';
import Panel from './Panel';

// interfaces
import { PostI } from './Post';

const Landing: React.FC = () => {
    var { userdata } = useContext(AuthContext);

    const [posts, updatePosts] = useState<PostI[]>([{
        user_id :'',
        post_id: '',
        title: '',
        description: '',
        url: '',
        created_at: ''
    }]);

    useEffect(() => {
    	
		fetch(`//${SERVIDOR}/api/posts`, {
		    method: 'GET'
		})
		.then(res => res.json())
		.catch(err => console.error(err))
		.then(posts => {
		  updatePosts(posts);
		});
    }, []);

    return (
        <>
          <Panel />
          <div className="page">
            { !!userdata && <NewPost /> }

            <div className="layout">
            {  
                posts.length > 1 ? (
                  posts.map((post: PostI) => (
                      <>
                        <Post post={post} />
                      </>
                  ))
                )
                : (
                  <h1>Loading posts...</h1>
                )
            }
            </div>
          </div>
      </>
    );
}

export default Landing;