import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../helpers/useForm";
import { alertActions } from "../../redux/action/alertAction";
import { newsAction } from "../../redux/action/newsAction";
import "./CreateNews.scss";
const isNotEmpty = (value) => value?.trim() !== "";

const CreateNews = () => {
  const alert = useSelector((el) => el?.alert);
  const dispatch = useDispatch();
  const {
    value: title,
    isValid: titleIsValid,
    hasError: titleHasError,
    valueChangedHandler: titleChangeHandler,
    inputBlurHandler: titleBlurHandler,
  } = useForm(isNotEmpty);
  const {
    value: author,
    isValid: authorIsValid,
    hasError: authorHasError,
    valueChangedHandler: authorChangeHandler,
    inputBlurHandler: authorBlurHandler,
  } = useForm(isNotEmpty);
  const {
    value: date,
    isValid: dateIsValid,
    hasError: dateHasError,
    valueChangedHandler: dateChangeHandler,
    inputBlurHandler: dateBlurHandler,
  } = useForm(isNotEmpty);
  const {
    value: category,
    isValid: categoryIsValid,
    hasError: categoryHasError,
    valueChangedHandler: categoryChangeHandler,
    inputBlurHandler: categoryBlurHandler,
  } = useForm(isNotEmpty);
  const {
    value: description,
    isValid: descriptionIsValid,
    hasError: descriptionHasError,
    valueChangedHandler: descriptionChangeHandler,
    inputBlurHandler: descriptionBlurHandler,
  } = useForm(isNotEmpty);
  const { value: video, valueChangedHandler: videoChangeHandler } =
    useForm(isNotEmpty);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const imageHandler = (img) => {
    const data = new FormData();
    data.append("file", img);
    data.append("upload_preset", "zoahguuq");
    axios
      .post("https://api.cloudinary.com/v1_1/folajimidev/image/upload", data)
      .then((res) => {
        setImage(res.data.url);
      });
  };
  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    let payload = {
      title,
      description,
      author,
      date,
      image,
      video,
      category,
    };

    if (
      !titleIsValid ||
      !authorIsValid ||
      !dateIsValid ||
      !categoryIsValid ||
      !descriptionIsValid
    ) {
      dispatch(alertActions.error("Fill in all required fields"));
      return;
    } else if (!image && !video) {
      dispatch(alertActions.error("Upload an image/Post a video link"));
      return;
    }
    dispatch(newsAction.postNews(payload));
  };
  useEffect(() => {
    if (alert) {
      setLoading(false);
    }
  }, [dispatch]);

  return (
    <div>
      <div className="blog-form">
        <h2 style={{ textAlign: "center" }}>CREATE NEWS</h2>

        <form onSubmit={handleSubmit}>
          <div className="title">
            <label htmlFor="title">
              Title <span className="error-text">*</span>
            </label>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={titleChangeHandler}
              onBlur={titleBlurHandler}
            />
            {titleHasError && (
              <p className="error-text">Title cannot be empty</p>
            )}
          </div>
          <div className="author">
            <label htmlFor="title">
              Author <span className="error-text">*</span>
            </label>
            <input
              type="text"
              placeholder="Author"
              value={author}
              onChange={authorChangeHandler}
              onBlur={authorBlurHandler}
            />
            {authorHasError && (
              <p className="error-text">Author cannot be empty</p>
            )}
          </div>
          <div className="date">
            <label htmlFor="date">
              Date of News <span className="error-text">*</span>
            </label>
            <input
              type="date"
              id="birthday"
              name="birthday"
              value={date}
              onChange={dateChangeHandler}
              onBlur={dateBlurHandler}
            />
            {dateHasError && <p className="error-text">Date cannot be empty</p>}
          </div>
          <div className="videolink">
            <label htmlFor="title">Video Link</label>
            <input
              type="text"
              placeholder="https://youtube.leyu12"
              value={video}
              onChange={videoChangeHandler}
            />
          </div>
          <div className="image">
            <label htmlFor="title">Upload Image</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/png, image/jpeg"
              onChange={(e) => imageHandler(e.target.files[0])}
            />
          </div>
          <div className="category">
            <label htmlFor="category">
              Category <span className="error-text">*</span>
            </label>
            <select
              onChange={categoryChangeHandler}
              onBlur={categoryBlurHandler}
            >
              <option value="" selected disabled>
                Select News Category
              </option>
              <option value="News">News</option>
              <option value="Politics">Politics</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Business">Business</option>
              <option value="Crime Report">Crime Report</option>
              <option value="Sport">Sport</option>
            </select>
            {categoryHasError && (
              <p className="error-text">Select a category</p>
            )}
          </div>
          <div className="desc">
            <label htmlFor="desc">
              Description <span className="error-text">*</span>
            </label>
            <textarea
              name="desc"
              id=""
              rows="10"
              placeholder="Description"
              value={description}
              onChange={descriptionChangeHandler}
              onBlur={descriptionBlurHandler}
            />
            {descriptionHasError && (
              <p className="error-text">Description cannot be empty</p>
            )}
          </div>
          <div className="submit">
            <button disabled={loading}>
              {loading ? "Submitting..." : "Post News"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNews;
