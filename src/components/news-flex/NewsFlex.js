import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BASE_API_URL, newsAction } from "../../redux/action/newsAction";
import axios from "axios";
import { routes } from "../../routes";
import { getNewsClicks, truncateText } from "../card/Card";
import { convertDate, convertToSlug } from "../entertainment/Entertainment";
import ImageCard from "../image-card/ImageCard";
import { Pagination } from "../../components";
import "./news-flex.scss";
import Swal from "sweetalert2";
import { alertActions } from "../../redux/action/alertAction";

function NewsFlex() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let PageSize = 10;
  let isLoggedin = JSON.parse(localStorage.getItem("isLoggedIn"));
  const [currentPage, setCurrentPage] = useState(1);
  const clickedNews = useSelector((el) => el?.clickedNews);
  const store = useSelector((el) => el?.categoryNews);
  const data = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return store.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, store, PageSize]);
  const handleClicks = (id) => {
    axios
      .get("https://ipapi.co/json/")
      .then((response) => {
        let data = response.data;
        let payload = {
          id,
          ip: data.ip,
        };
        console.log(payload);
        dispatch(newsAction.postClickedNews(payload));
        dispatch(newsAction.getSingleNews(payload));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleDeleteNews = (id) => {
    Swal.fire({
      title: "Are you sure you want to delete this news?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(`${BASE_API_URL}/delete-news`, { id })
          .then((res) => {
            if (res.data.status) {
              dispatch(alertActions.success(res.data.message));
              Swal.fire("Deleted!", "News has been deleted.", "success").then(
                (res) => {
                  if (res.isConfirmed) {
                    dispatch(newsAction.getNewsCategory(slug));
                  }
                }
              );
            } else {
              throw res.data;
            }
          })
          .catch((err) => {
            dispatch(alertActions.error(err.message));
            Swal.fire("Error!", "News was not deleted.", "error");
          });
      }
    });
  };
  const handleEditNews = (id) => {
    let news = store.find((el) => el._id === id);
    dispatch(newsAction.getSingleNews({ id }));
    localStorage.setItem("newsID", id);
    navigate(`/edit-news/${convertToSlug(news.title)}`);
  };
  useEffect(() => {
    dispatch(newsAction.getNewsCategory(slug));
  }, [dispatch, slug]);
  if (!store?.length) {
    return (
      <div
        style={{
          display: "flex",
          height: "480px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        No News
      </div>
    );
  }
  return (
    <div>
      <ImageCard store={store[store?.length - 1]} />
      {data
        ?.filter((el) => el?.title !== store[store?.length - 1]?.title)
        ?.map((ele) => {
          return (
            <div className="news-flex" key={ele?._id}>
              <div className="img">
                <img
                  src={
                    typeof ele?.image === "object" ? ele?.image[0] : ele?.image
                  }
                  alt="img.jpg"
                />
              </div>
              <div className="item-body">
                <Link
                  to={
                    routes.NEWSPAGE_MAIN.path + "/" + convertToSlug(ele?.title)
                  }
                  onClick={() => handleClicks(ele?._id)}
                >
                  <h2>{ele?.title}</h2>
                </Link>
                <div className="time-bottom">
                  <small>
                    BY <Link href="#">{ele?.author}</Link>
                  </small>
                  <small className="svg-flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="10"
                      fill="currentColor"
                      class="bi bi-clock"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                      <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
                    </svg>
                    {convertDate(ele?.createdAt)}
                  </small>
                  <small className="svg-flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="10"
                      fill="currentColor"
                      class="bi bi-chat"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z" />
                    </svg>
                    0
                  </small>
                  <small
                    style={{
                      display: "flex",
                      gap: "5px",
                      alignItems: "center",
                      color: "#002",
                    }}
                  >
                    <i class="fa fa-eye" aria-hidden="true"></i>
                    {getNewsClicks(clickedNews, ele?._id)}
                  </small>
                </div>
                <p>{truncateText(ele?.description, 200)}</p>
                {isLoggedin && (
                  <div className="flex">
                    <div onClick={() => handleDeleteNews(ele?._id)}>
                      <i class="fa fa-trash" aria-hidden="true">
                        <span>Delete</span>
                      </i>
                    </div>

                    <div onClick={() => handleEditNews(ele?._id)}>
                      <i class="fa fa-pencil" aria-hidden="true">
                        <span> Edit</span>
                      </i>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={store?.length - 1}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}
export default NewsFlex;
