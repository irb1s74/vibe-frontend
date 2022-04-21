import React, { FC, memo, useCallback, useEffect } from 'react';
import { PageWrapper } from './Popular.styled';
import { Stack, Typography } from '@mui/material';
import Card from '../../components/UI/NewsCard/Card';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { IPost } from '../../models/IPost';
import { getPosts } from '../../store/reducers/postsReducer/actions';
import { useDispatch } from 'react-redux';

interface PopularProps {
  handleGetPosts: () => void;
  posts: IPost[];
}

const Popular: FC<PopularProps> = memo(({ posts, handleGetPosts }) => {
  useEffect(() => {
    handleGetPosts();
  }, []);

  return (
    <PageWrapper>
      <Typography textAlign='center' variant='h6'>
        NEWS
      </Typography>
      <Stack direction='column' alignItems='center' spacing={5}>
        {posts.map((post: IPost, index) => (
          <Card key={`${index}_${post.id}`} post={post} />
        ))}
      </Stack>
    </PageWrapper>
  );
});

const ContainerPopular = () => {
  const dispatch = useDispatch();
  const posts = useTypedSelector((state) => state.posts.News);
  const handleGetPosts = useCallback(() => dispatch(getPosts()), []);

  return <Popular posts={posts} handleGetPosts={handleGetPosts} />;
};

export default ContainerPopular;
