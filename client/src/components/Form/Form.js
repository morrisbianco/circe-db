import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

import useStyles from './styles';

import { createPost, updatePost } from '../../actions/posts';

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    title: '', author: '', type: '', privateLink: '', publicLink: '', tags: '', format: '',
  });
  const post = useSelector((state) => currentId ? state.posts.posts.find((p) => p._id === currentId) : null);
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));

  useEffect(() => {
    if (post) setPostData(post);
  }, [post])

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId) {
      dispatch(updatePost(currentId, postData));
    } else {
      dispatch(createPost(postData));
    }
    clear();
  }

  const clear = () => {
    setCurrentId(null);
    setPostData({ title: '', author: '', type: '', privateLink: '', publicLink: '', tags: '', format: '', });
  }

  if (!user?.result) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In to add a resource.
        </Typography>
      </Paper>
    )
  }

  return (
    <Paper className={classes.paper} elevation={6}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? 'Edit' : 'Add'} a Resource</Typography>
        <FormControl className={classes.dropdown}>
          <InputLabel id="select-format">Internal/External</InputLabel>
          <Select
            name="Format"
            labelId="select-format"
            id="select-format"
            value={postData.format}
            label="Format"
            onChange={(e) => setPostData({ ...postData, format: e.target.value })}
            variant="outlined"
          >
            <MenuItem value="Internal">Internal</MenuItem>
            <MenuItem value="External">External</MenuItem>
          </Select>
        </FormControl>
        <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
        <TextField name="author" variant="outlined" label="Author" fullWidth value={postData.author} onChange={(e) => setPostData({ ...postData, author: e.target.value })} />
        <FormControl className={classes.dropdown}>
          <InputLabel id="select">Type</InputLabel>
          <Select
            name="type"
            labelId="select"
            id="select"
            value={postData.type}
            label="Type"
            onChange={(e) => setPostData({ ...postData, type: e.target.value })}
            variant="outlined"
          >
            <MenuItem value="Webinar">Webinar</MenuItem>
            <MenuItem value="Conference Talk">Conference Talk</MenuItem>
            <MenuItem value="Intensive Class">Intensive Class</MenuItem>
            <MenuItem value="Atrium Class">Atrium Class</MenuItem>
            <MenuItem value="Podcast">Podcast</MenuItem>
            <MenuItem value="Article">Article</MenuItem>
            <MenuItem value="Book">Book</MenuItem>
            <MenuItem value="Other Recording">Other Recording</MenuItem>
          </Select>
        </FormControl>
        <TextField name="privateLink" variant="outlined" label="Private Link" fullWidth value={postData.privateLink} onChange={(e) => setPostData({ ...postData, privateLink: e.target.value })} />
        <TextField name="publicLink" variant="outlined" label="Public Link" fullWidth value={postData.publicLink} onChange={(e) => setPostData({ ...postData, publicLink: e.target.value })} />
        <TextField name="tags" variant="outlined" label="Tags (Comma Seperated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth >Submit</Button>
        <Button variant="contained" color="primary" size="small" onClick={clear} fullWidth >Clear</Button>
      </form>
    </Paper>
  );
}

export default Form;