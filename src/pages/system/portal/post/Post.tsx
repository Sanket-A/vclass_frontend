import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// components
import PostCard from '../../../../components/system/post/PostCard';
import Button from '../../../../components/global/button/Button';

// schemas
import { postSchema } from '../../../../utils/schemas';

// handlers
import { apiHandler } from '../../../../handlers/apiHandler';
import { showMessage } from '../../../../handlers/messageHandler';

// context
import { useUserInfo } from '../../../../context/UserInfoContext';

const Post = () => {
  const params = useParams();
  const navigate = useNavigate();
  const userInfoContext = useUserInfo();

  const [posts, setPosts] = useState<postSchema[]>([]);

  const getPosts = async () => {
    const res = await apiHandler('get', `posts/subject/${params.subjectId}`);

    if (res.success) {
      setPosts(res.data);
    } else {
      showMessage(res.message, 'failure');
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className='pt-4 flex flex-col gap-4'>
      <div className='self-end'>
        <Button isSmall handleClick={() => navigate('create')}>
          Add Post
        </Button>
      </div>
      <div className='flex flex-col gap-4'>
        {posts.map((post, index) => {
          if (post.category !== 'submission') {
            return (
              <PostCard
                key={index}
                post={post}
                isMine={post.user._id === userInfoContext?.userInfo?._id}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default Post;
