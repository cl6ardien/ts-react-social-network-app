import React, { useContext } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

//Context
import { AuthContext } from '../auth_context';

import { SERVIDOR, PUBLIC } from '../index';

export interface PostI {
    user_id: string;
    post_id: string;
    title: string;
    description: string;
    url: string;
    created_at: string;
}

const Post: any = (props: any) => {
    const { userdata } = useContext(AuthContext);
    let context_user_id = '';
    const { user_id, post_id, url, title, description, created_at } = props.post;

    try{
        //@ts-ignore
        context_user_id = userdata.user_id;
    } catch(err) {
        console.error(err);
    }

    return (
    <>
        <div className="post_card">
            <div className="post_card__body">
                <Link to={`/posts/${post_id}`}>
                    <img src={`${PUBLIC}/${url.split('/')[2]}`} alt="" />
                </Link>
            </div>
            <div className="post_card__footer">
                {
                    //@ts-ignore
                    context_user_id === user_id ? (
                        <>
                            <button id="btn-delete_post">
                                <svg width="12" height="13" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M5.843 4.912L10.255.6l1.397 1.43L7.24 6.344l4.312 4.412-1.43 1.397L5.81 7.74l-4.412 4.312L0 10.622 4.412 6.31.1 1.898 1.53.5l4.313 4.412z" fill="#606060" fill-rule="nonzero"/>
                                </svg>
                            </button>
                        </>
                    ) : (
                        ''
                    )
                }
                <h3>{title}</h3>
                <textarea cols={42} rows={5} id="post_description" disabled={true}>
                    {description}
                </textarea>
                <span>
                    <small>
                        {moment(created_at).fromNow()}
                    </small>
                </span>
                {
                    context_user_id && <button id="btn-like_post">&#9829;</button>
                }
            </div>
        </div>
    </>
    );
}

export default Post;