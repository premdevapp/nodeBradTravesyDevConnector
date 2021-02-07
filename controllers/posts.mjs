import Post from "../model/Post.mjs";
import Profile from "../model/Profile.mjs";
import { validatePostsInput } from "../validation/postValidation.mjs";

export const getPostTest = (req, res, next) => {
  return res.json({ message: "Posts works!" });
};

export const getAllPost = (req, res, next) => {
  Post.find()
    .sort({ date: -1 })
    .then((posts) => res.json(posts))
    .catch((error) => {
      console.error(error);
      return res.status(404).json({ post: "Cant get all posts" });
    });
};

export const getAPost = (req, res, next) => {
  Post.findById(req.params.post_id)
    .then((post) => res.json(post))
    .catch((error) => {
      console.error(error);
      return res.status(404).json({ post: "Cant get a post" });
    });
};

export const post2Post = (req, res, next) => {
  const { errors, isValid } = validatePostsInput(req.body);

  // check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const newPost = new Post({
    user: req.user.id,
    text: req.body.text,
    name: req.body.name,
    avator: req.body.avator,
  });
  newPost
    .save()
    .then((post) => res.json(post))
    .catch((error) => {
      console.error(error);
      return res.status(404).json({ post: "Cant post by this user" });
    });
};
export const deleteAPost = (req, res, next) => {
  Profile.findOne({ user: req.user.id })
    .then((profile) => {
      Post.findById(req.params.post_id).then((post) => {
        // check for post owner
        if (post.user.toString() !== req.user.id) {
          return res.status(401).json({ notAuthorized: "user not authorized" });
        }
        // delete
        post.deleteOne().then(() => {
          return res.json({ success: "deleted succesfully" });
        });
      });
    })
    .catch((error) => {
      console.error(error);
      return res.status(404).json({ post: "Cant delete a post by this user" });
    });
};

export const likeAPost = (req, res, next) => {
  Profile.findOne({ user: req.user.id })
    .then((profile) => {
      Post.findById(req.params.post_id).then((post) => {
        if (
          post.likes.filter((like) => like.user.toString() === req.user.id)
            .length > 0
        ) {
          return res
            .status(400)
            .json({ alreadyliked: "User already liked this post" });
        }
        // add user id to the likes arry
        post.likes.unshift({ user: req.user.id });

        post.save().then((likePost) => res.json(likePost));
      });
    })
    .catch((error) => {
      console.error(error);
      return res.status(404).json({ post: "Cant like a post by this user" });
    });
};

export const removeLikeAPost = (req, res, next) => {
  Profile.findOne({ user: req.user.id })
    .then((profile) => {
      Post.findById(req.params.post_id).then((post) => {
        if (
          post.likes.filter((like) => like.user.toString() === req.user.id)
            .length === 0
        ) {
          return res
            .status(400)
            .json({ notLiked: "User havent liked this post" });
        }
        // remove user id from the likes arry
        const removeIndex = post.likes
          .map((item) => item.user.toString())
          .indexOf(req.user.id);

        //splice
        post.likes.splice(removeIndex, 1);
        post.save().then((unlikePost) => res.json(unlikePost));
      });
    })
    .catch((error) => {
      console.error(error);
      return res.status(404).json({ post: "Cant like a post by this user" });
    });
};

export const addCommentAPost = (req, res, next) => {
  const { errors, isValid } = validatePostsInput(req.body);

  // check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  Post.findById(req.params.post_id)
    .then((post) => {
      const newComment = {
        text: req.body.text,
        name: req.body.name,
        avator: req.body.avator,
        user: req.user.id,
      };
      post.comments.unshift(newComment);
      post.save().then((commPost) => res.json(commPost));
    })
    .catch((error) => {
      console.error(error);
      return res.status(404).json({ post: "Cant comment a post by this user" });
    });
};

export const removeCommentAPost = (req, res, next) => {
  Post.findById(req.params.post_id)
    .then((post) => {
      // check comment i exits
      if (
        post.comments.filter(
          (comment) => comment._id.toString() === req.params.comment_id
        ).length === 0
      ) {
        return res
          .status(404)
          .json({ commentnotexits: "comment does not exits" });
      }
      // get remove index
      const removeIndex = post.comments
        .map((item) => item._id.toString())
        .indexOf(req.params.comment_id);

      // splice
      post.comments.splice(removeIndex, 1);
      post.save().then((commPost) => res.json(commPost));
    })
    .catch((error) => {
      console.error(error);
      return res.status(404).json({ post: "Cant comment a post by this user" });
    });
};
