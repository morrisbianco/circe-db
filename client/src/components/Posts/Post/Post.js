import React, { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';

import { getPostsBySearch } from '../../../actions/posts';
import { deletePost } from '../../../actions/posts';
import { useDispatch } from 'react-redux';

import useStyles from './styles';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Post = ({ post, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const query = useQuery();
  const history = useHistory();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');
  const [search, setSearch] = useState('');
  const [author, setAuthor] = useState('');
  const [tags, setTags] = useState([]);
  const [showResource, setShowResource] = useState(true);
  const handleShowResource = () => setShowResource((prevShowResource) => !prevShowResource);

  const searchPost = () => {
    if (search.trim() || author.trim() || tags) {
      dispatch(getPostsBySearch({ search, author, tags: tags.join(',') }));

      history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
    } else {
      history.push('/');
    }
  };

  return (
    <Card className={classes.card} raised elevation={6}>
      <CardContent>
        <Typography variant="h5" >{post.title}</Typography>
        <Link className={classes.subtitle} onMouseUp={searchPost} value={post.author} to='' onMouseDown={() => setSearch(post.author)}>{`by ${post.author}`}</Link>
      </CardContent>
      <Button size="small" color="primary" variant='contained' className={classes.view} onClick={handleShowResource}>{showResource === false ? 'Hide' : 'Show'}</Button>
      <div handleShowResource={handleShowResource} className={showResource === false ? classes.show : classes.hide}>
        <CardContent>
          <Typography className={classes.format} variant="h5">{post.format}</Typography>
          <Typography className={classes.title} variant="h6" component="p">{`Type: ${post.type}`}</Typography>
          <Typography className={classes.title} variant="h6" component="p">Private Link: <a href={post.privateLink} target="_blank" rel="noreferrer">{post.privateLink}</a></Typography>
          <Typography className={classes.title} variant="h6" component="p">Public Link: <a href={post.publicLink} target="_blank" rel="noreferrer">{post.publicLink}</a></Typography>
        </CardContent>
        <div className={classes.details}>
          <Typography variant="h6" color="textSecondary" gutterBottom >Tags: {post.tags.map((tag) => `${tag}, `)}</Typography>
        </div>
        <CardActions className={`${classes.overlay3} ${classes.cardActions}`}>
          <Button size="small" onClick={() => setCurrentId(post._id)}>
            <CreateIcon fontSize="small" />
            Edit
          </Button>
          <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}>
            <DeleteIcon fontSize="small" />
            Delete
          </Button>
        </CardActions>
      </div>
    </Card>
  );
}

export default Post;