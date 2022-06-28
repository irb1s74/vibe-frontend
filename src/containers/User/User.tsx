import React, { FC, memo, useCallback, useEffect } from 'react';
import { PageWrapper, UserContent } from './User.styled';
import { getProfileUser } from '../../store/reducers/profileReducer/action';
import { useDispatch } from 'react-redux';
import { Route, Routes, useParams } from 'react-router-dom';
import Header from '../../components/UserPage/Header/Header';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { IAuthor } from '../../models/IAuthor';
import { EFetchStatus } from '../../models/EFetchStatus';
import { Skeleton } from '@mui/material';
import UserPublish from '../../components/UserPage/Publish/Publish';
import { EModal } from '../../models/EModal';
import { openModal } from '../../store/reducers/modalReducer/actions';
import { IPost } from '../../models/IPost';

interface UserProps {
  handleGetUser: (userId: number) => void;
  handleOpenModal: (id: string, type: EModal, optional: any) => () => void;
  user: IAuthor;
  publishPosts: IPost[];
  profileFetchStatus: EFetchStatus;
}

// <Route path='/adbour' element={<ProfileDrafts />} />

const User: FC<UserProps> = memo(
  ({
    handleGetUser,
    user,
    profileFetchStatus,
    publishPosts,
    handleOpenModal,
  }) => {
    const { id } = useParams();
    const profileIsLoading =
      profileFetchStatus === EFetchStatus.loading ||
      profileFetchStatus === EFetchStatus.idle;
    useEffect(() => {
      if (id) {
        handleGetUser(+id);
      }
    }, [id]);
    return (
      <PageWrapper>
        {profileIsLoading ? (
          <Skeleton
            variant='rectangular'
            animation='wave'
            height={486}
            sx={{ borderRadius: '20px' }}
          />
        ) : (
          <Header user={user} />
        )}
        <UserContent>
          <Routes>
            <Route
              index
              element={
                <UserPublish
                  handleOpenModal={handleOpenModal}
                  isLoading={profileIsLoading}
                  publishPosts={publishPosts}
                />
              }
            />
            <Route
              path='/details'
              element={
                <UserPublish
                  handleOpenModal={handleOpenModal}
                  isLoading={profileIsLoading}
                  publishPosts={publishPosts}
                />
              }
            />
          </Routes>
        </UserContent>
      </PageWrapper>
    );
  }
);

const ContainerUser = () => {
  const dispatch = useDispatch();
  const user = useTypedSelector((state) => state.profile.user);
  const posts = useTypedSelector((state) => state.profile.publishPosts);
  const profileFetchStatus = useTypedSelector(
    (state) => state.profile.profileFetchStatus
  );

  const handleGetUser = useCallback(
    (userId: number) => dispatch(getProfileUser(userId)),
    []
  );
  const handleOpenModal = useCallback(
    (id: string, type: EModal, optional: any) => () =>
      dispatch(openModal(id, type, optional)),
    []
  );

  return (
    <User
      handleOpenModal={handleOpenModal}
      publishPosts={posts}
      handleGetUser={handleGetUser}
      user={user}
      profileFetchStatus={profileFetchStatus}
    />
  );
};

export default ContainerUser;