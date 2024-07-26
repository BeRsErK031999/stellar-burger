import { FC, useEffect } from 'react';
import { useDispatch } from '../../services/store';
import {
  startOrderFeed,
  stopOrderFeed
} from '../../services/slices/orderFeedSlice';
import FeedUI from '../../components/ui/pages/feed/feed';

export const Feed: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startOrderFeed() as any);
    return () => {
      dispatch(stopOrderFeed() as any);
    };
  }, [dispatch]);

  return <FeedUI />;
};

export default Feed;
