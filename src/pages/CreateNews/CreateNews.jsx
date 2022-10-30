import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../helpers/useForm";
import { alertActions } from "../../redux/action/alertAction";
import { newsAction } from "../../redux/action/newsAction";
import "./CreateNews.scss";
const isNotEmpty = (value) => value?.trim() !== "";
const News = ({ type }) => {
  const alert = useSelector((el) => el?.alert);
  const dispatch = useDispatch();
  const id = localStorage.getItem("newsID");
  const [news, setNews] = useState("");

  useEffect(() => {
    axios
      .post(`https://cr-news-api.herokuapp.com/single-news`, { id })
      .then((res) => {
        setNews(res.data.news);
      });
  }, [id]);
  const {
    value: title,
    isValid: titleIsValid,
    hasError: titleHasError,
    valueChangedHandler: titleChangeHandler,
    inputBlurHandler: titleBlurHandler,
  } = useForm(isNotEmpty, news?.title);
  const {
    value: author,
    isValid: authorIsValid,
    hasError: authorHasError,
    valueChangedHandler: authorChangeHandler,
    inputBlurHandler: authorBlurHandler,
  } = useForm(isNotEmpty, news?.author);
  const {
    value: date,
    isValid: dateIsValid,
    hasError: dateHasError,
    valueChangedHandler: dateChangeHandler,
    inputBlurHandler: dateBlurHandler,
  } = useForm(isNotEmpty, news?.createdAt);
  const {
    value: category,
    isValid: categoryIsValid,
    hasError: categoryHasError,
    valueChangedHandler: categoryChangeHandler,
    inputBlurHandler: categoryBlurHandler,
  } = useForm(isNotEmpty, news?.category);
  const {
    value: description,
    isValid: descriptionIsValid,
    hasError: descriptionHasError,
    valueChangedHandler: descriptionChangeHandler,
    inputBlurHandler: descriptionBlurHandler,
  } = useForm(isNotEmpty, news?.description);
  console.log(date, news?.createdAt);

  const { value: video, valueChangedHandler: videoChangeHandler } =
    useForm(isNotEmpty);
  const [image, setImage] = useState([]);
  const [loading, setLoading] = useState(false);
  const imageHandler = (img) => {
    const data = new FormData();
    setLoading(true);
    if (img.length > 1) {
      for (let i = 0; i < img.length; i++) {
        data.append("file", img[i]);
        data.append("upload_preset", "zoahguuq");
        axios
          .post(
            "https://api.cloudinary.com/v1_1/folajimidev/image/upload",
            data
          )
          .then((res) => {
            if (typeof image !== "string") {
              setImage((prev) => [...prev, res.data.secure_url]);
              setLoading(false);
            } else {
              setImage([]);
              setImage((prev) => [...prev, res.data.secure_url]);
              setLoading(false);
            }
          });
      }
    } else {
      data.append("file", img[0]);
      data.append("upload_preset", "zoahguuq");
      axios
        .post("https://api.cloudinary.com/v1_1/folajimidev/image/upload", data)
        .then((res) => {
          setImage(res.data.secure_url);
          setLoading(false);
        })
        .finally(() => {
          console.log("Experiment completed");
        });
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
      image: typeof image !== "string" ? image : image,
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
    console.log(payload);
  };
  useEffect(() => {
    if (alert) {
      setLoading(false);
    }
  }, [dispatch, alert]);
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
            <button disabled={loading}>
              {loading ? "Submitting..." : "Post News"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default News;