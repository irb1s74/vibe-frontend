import React, { FC, useCallback, useState } from 'react';
import {
  CardBoxAction,
  CardContent,
  CardFooter,
  CardFooterAction,
  CardFooterVote,
  CardHeader,
  CardHeaderAction,
  CardHeaderInfo,
  WrapperCard,
} from './Card.styled';
import {
  Avatar,
  CardMedia,
  IconButton,
  MenuItem,
  Typography,
} from '@mui/material';
import {
  IoBookmark,
  IoChatbubbles,
  IoChevronDownOutline,
  IoChevronUpOutline,
  IoEllipsisHorizontalSharp,
  IoPersonAddSharp,
} from 'react-icons/io5';
import { IPost } from '../../../models/IPost';
import { EModal } from '../../../models/EModal';
import MenuList from '../MenuList/MenuList';

const Card: FC<{
  post: IPost;
  handleOpenModal: (id: string, type: EModal, optional: any) => () => void;
}> = ({ post, handleOpenModal }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuListOpen = Boolean(anchorEl);
  const handleMenuListOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuListClose = useCallback(() => setAnchorEl(null), []);
  return (
    <WrapperCard>
      <CardHeader>
        <CardHeaderInfo
          direction='row'
          alignItems='center'
          justifyContent='space-between'
          spacing={2}
        >
          <Avatar
            alt={post.author.nickname}
            src={post.author.avatar}
            sx={{ width: 32, height: 32 }}
          />
          <Typography variant='subtitle1'>{post.author.nickname}</Typography>
        </CardHeaderInfo>
        <CardHeaderAction>
          <IconButton sx={{ fontSize: 16 }}>
            <IoPersonAddSharp />
          </IconButton>
          <IconButton onClick={handleMenuListOpen} sx={{ fontSize: 16 }}>
            <IoEllipsisHorizontalSharp />
          </IconButton>
        </CardHeaderAction>
      </CardHeader>
      <CardContent>
        <Typography sx={{ mb: '7px', mt: '12px' }} variant='h6'>
          {post.data?.title}
        </Typography>
        {post.data.entry?.map((obj) =>
          obj.type === 'paragraph' ? (
            <Typography
              key={obj.id}
              dangerouslySetInnerHTML={{ __html: obj.data.text }}
            />
          ) : (
            obj.type === 'image' && (
              <CardMedia
                key={obj.id}
                component='img'
                height='194'
                image={`${obj.data.file.url}`}
                alt={obj.data.caption}
              />
            )
          )
        )}
      </CardContent>
      <CardFooter>
        <CardFooterAction direction='row' alignItems='center' spacing={2}>
          <CardBoxAction
            // onClick={() => {
            //   console.log(this);
            // }}
            disableRipple
          >
            <IoChatbubbles />
            <Typography sx={{ ml: '8px' }} variant='subtitle1'>
              52
            </Typography>
          </CardBoxAction>
          <CardBoxAction>
            <IoBookmark />
          </CardBoxAction>
        </CardFooterAction>
        <CardFooterVote direction='row' alignItems='center' spacing={1}>
          <IconButton>
            <IoChevronDownOutline />
          </IconButton>
          <Typography color='green' variant='subtitle1'>
            {post.rating}
          </Typography>
          <IconButton>
            <IoChevronUpOutline />
          </IconButton>
        </CardFooterVote>
      </CardFooter>
      <MenuList
        isMenuListOpen={isMenuListOpen}
        anchorEl={anchorEl}
        handleMenuListClose={handleMenuListClose}
      >
        <MenuItem
          onClick={handleOpenModal(
            EModal.createPostModal,
            EModal.createPostModal,
            post
          )}
        >
          <Typography variant='body2'>Редактировать</Typography>
        </MenuItem>
      </MenuList>
    </WrapperCard>
  );
};

export default Card;
