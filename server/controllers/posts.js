import express from 'express';
import mongoose from 'mongoose';

import PostMessage from "../models/postMessage.js";

const router = express.Router();

export const getPosts = async (req, res) => {
  const { page } = req.query;

  try {
    const LIMIT = 7;
    const startIndex = (Number(page) - 1) * LIMIT;
    const total = await PostMessage.countDocuments({});

    const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

    res.status(200).json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const createPost = async (req, res) => {
  const { title, author, type, privateLink, publicLink, tags, format } = req.body;

  const newPostMessage = new PostMessage({ title, author, type, privateLink, publicLink, tags, format })

  try {
    await newPostMessage.save();

    res.status(201).json(newPostMessage);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

  const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true });
  
  res.json(updatedPost);
}

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

  await PostMessage.findByIdAndRemove(id);


  res.json({ message: 'Post deleted successfully' });
}

export const getPostsBySearch = async (req, res) => {
  const { searchQuery, author, tags } = req.query;

  try {
    const title = new RegExp(searchQuery, 'i');
    const author = new RegExp(searchQuery, 'i');

    const posts = await PostMessage.find({ $or: [ { title }, { author }, { tags: { $in: tags.split(',') } } ] });

    res.json({ data: posts });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export default router;