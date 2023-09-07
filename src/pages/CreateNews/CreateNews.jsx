import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "../../helpers/useForm";
import { alertActions } from "../../redux/action/alertAction";
import { newsAction } from "../../redux/action/newsAction";
import "./CreateNews.scss";
import { useLocation, useNavigate } from "react-router-dom";
const isNotEmpty = (value) => value?.trim() !== "";
const News = ({ type }) => {
  // const alert = useSelector((el) => el?.alert);
  const dispatch = useDispatch();
  const id = localStorage.getItem("newsID");
  const { state } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    // if (!state) {
    //   navigate("/");
    // }
    document.title = state ? "Edit News" : "Create News";
  }, [id, navigate, state]);
  const {
    value: title,
    isValid: titleIsValid,
    hasError: titleHasError,
    valueChangedHandler: titleChangeHandler,
    inputBlurHandler: titleBlurHandler,
  } = useForm(isNotEmpty, state?.title);
  const {
    value: author,
    isValid: authorIsValid,
    hasError: authorHasError,
    valueChangedHandler: authorChangeHandler,
    inputBlurHandler: authorBlurHandler,
  } = useForm(isNotEmpty, state?.author);

  const {
    value: date,
    isValid: dateIsValid,
    hasError: dateHasError,
    valueChangedHandler: dateChangeHandler,
    inputBlurHandler: dateBlurHandler,
  } = useForm(
    isNotEmpty,
    state ? new Date(state?.createdAt).toISOString().split("T")[0] : ""
  );
  const {
    value: category,
    isValid: categoryIsValid,
    hasError: categoryHasError,
    valueChangedHandler: categoryChangeHandler,
    inputBlurHandler: categoryBlurHandler,
  } = useForm(isNotEmpty, state?.category);
  const {
    value: description,
    isValid: descriptionIsValid,
    hasError: descriptionHasError,
    valueChangedHandler: descriptionChangeHandler,
    inputBlurHandler: descriptionBlurHandler,
  } = useForm(isNotEmpty, state?.description);

  const { value: video, valueChangedHandler: videoChangeHandler } =
    useForm(isNotEmpty);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);

  const imageHandler = (img) => {
    setImgLoading(true);
    setImages([]);
    try {
      for (const image of img) {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "zoahguuq");
        axios
          .post(
            "https://api.cloudinary.com/v1_1/folajimidev/image/upload",
            formData
          )
          .then((res) => {
            setImgLoading(false);
            setImages((prev) => [...prev, res.data["secure_url"]]);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    let payload = {
      title,
      description,
      author,
      date,
      images,
      video,
      category,
      _id: state ? state?._id : "",
    };

    if (
      !titleIsValid ||
      !authorIsValid ||
      !dateIsValid ||
      !categoryIsValid ||
      !descriptionIsValid
    ) {
      dispatch(alertActions.error("Fill in all required fields"));
      setLoading(false);
      return;
    } else if (images.length === 0 && !video) {
      dispatch(alertActions.error("Upload an image/Post a video link"));
      setLoading(false);
      return;
    }
    if (state) {
      console.log(payload);
     dispatch(newsAction.updateNews(payload));
    } else {
      // dispatch(alertActions.error("You can't post news.Talk to the developer"))
      setLoading(false)
      dispatch(alertActions.error("Note: Your hosting plan would end by Sept 25th,2023-chat up on folajimiopeyemisax13@gmail.com"));
      dispatch(newsAction.postNews(payload));
    }
  };
  if (type === "update") {
    return (
      <div>
        <div className="blog-form">
          <h2 style={{ textAlign: "center" }}>EDIT NEWS</h2>

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
              {dateHasError && (
                <p className="error-text">Date cannot be empty</p>
              )}
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
              <img src={state.image} alt="" />
            </div>
            <div className="image">
              <label htmlFor="title">Upload more Images</label>
              <input
                type="file"
                multiple
                id="image"
                name="image"
                accept="image/png, image/jpeg"
                onChange={(e) => imageHandler(e.target.files)}
              />
            </div>

            <div className="category">
              <label htmlFor="category">
                Category <span className="error-text">*</span>
              </label>
              <select
                onChange={categoryChangeHandler}
                onBlur={categoryBlurHandler}
                value={category}
              >
                <option value="" selected disabled>
                  Select News Category
                </option>
                <option value="Breaking News">News</option>
                <option value="Politics">Politics</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Business">Business</option>
                <option value="Crime Report">Crime Report</option>
                <option value="Sport">Sport</option>
                <option value="Opinions">Opinions</option>
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
              <button disabled={loading} style={{ background: "green" }}>
                {loading ? "Submitting..." : "Update News"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
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
            <label htmlFor="title">Upload Images</label>
            <input
              type="file"
              multiple
              id="image"
              name="image"
              accept="image/png, image/jpeg"
              onChange={(e) => imageHandler(e.target.files)}
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
              <option value="Breaking News">News</option>
              <option value="Politics">Politics</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Business">Business</option>
              <option value="Crime Report">Crime Report</option>
              <option value="Sport">Sport</option>
              <option value="Opinions">Opinions</option>
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
            <button disabled={loading || imgLoading}>
              {imgLoading
                ? "Uploading images.."
                : loading
                ? "Submitting..."
                : "Post News"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default News;
