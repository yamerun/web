import React, { useEffect, useState, useRef } from "react";
import style from "./ItemPage.module.scss";
import { Header } from "../../components/Header/Header";
import axios from "axios";
import { useLoaderData } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Comments } from "../../components/Comments/Comments";
import { Footer } from "../../components/Footer/Footer";

import { useSelector } from "react-redux";
import { ExchangerAccountNavigation } from "../../components/ExchangerAccountNavigation/ExchangerAccountNavigation";
import { useDispatch } from "react-redux";
import { Marks } from "../../components/Marks/Marks";
import { setUserRole } from "../../store/userAccountSlice/AccountSlice";
import { ItemPageExchangerDescription } from "../../components/ItemPageExchangerDecsription/ExchangerDescription";
import { ItemPageInfoBlock } from "../../components/ItemPageInfoBlock/ItemPageInfoBlock";

const ImageComponent = React.lazy(() =>
  import("../../components/ImageComponent/Image")
);
const AddComment = React.lazy(() =>
  import("../../components/AddComment/AddComment")
);

export const exchangeLoader = async ({ params }) => {
  const id = params.id;
  const res = await fetch(
    `https://change.pro/api/exchangers/get?exchanger_id=${id}`
  );
  const item = await res.json();
  return { id, item };
};

export const ItemPage = () => {
  const dispatch = useDispatch();
  const { item } = useLoaderData();
  const navigate = useNavigate();
  const [review, setReview] = useState();
  const [imgData, setImgData] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [hideBlocks, setHideBlocks] = useState(false);
  const { isExchangerRole } = useSelector((state) => ({
    isExchangerRole: state.AccountSlice.isExchangerRole,
  }));

  useEffect(() => {
    axios
      .get(
        `https://change.pro/api/reviews/get?sort=desc&orderBy=id&limit=5&exchanger_id=${item.data.id}`
      )
      .then(function (response) {
        setReview(response.data.data);
      })

      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const ref = useRef(null);
  const HideReviews = () => {
    setIsOpen(false);
  };
  const role = localStorage.getItem("userRole");
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    if (jwt !== null && role !== null && role === "exchanger") {
      dispatch(setUserRole(true));
    } else dispatch(setUserRole(false));
  }, [jwt, role]);

  const OpenIframe = () => {
    setHideBlocks(!hideBlocks);
  };

  useEffect(() => {
    if (hideBlocks === true) {
      IframeBlock.current.classList.add(`${style.open}`);
      iframebtn.current.classList.add(`${style.btnActive}`);
    }
    if (hideBlocks === false) {
      IframeBlock.current.classList.remove(`${style.open}`);
      iframebtn.current.classList.remove(`${style.btnActive}`);
    }
  }, [hideBlocks]);

  const IframeBlock = useRef(null);
  const iframebtn = useRef(null);

 
  const ShowReviews = () => {
      setIsOpen(true);
    };

  return (
    <div className={style.itemPage}>
      {isOpen && (
        <React.Suspense
          fallback={
            <h1
              style={{
                color: "white",
                textAlign: "center",
                fontSize: "15px",
              }}
            >
              ...Loading
            </h1>
          }
        >
          <AddComment HideReviews={HideReviews} id={item.data.id} />
        </React.Suspense>
      )}
      <Header />
      {isExchangerRole === true && <ExchangerAccountNavigation />}
      <div className={style.itemPage__container} ref={ref}>
        <div className={style.itemPage__container__exchangeInfo}>
          {Object.keys(item.data.logo).length !== 0 ? (
            <React.Suspense
              fallback={
                <h1
                  style={{
                    color: "white",
                    textAlign: "center",
                    fontSize: "15px",
                  }}
                >
                  ...Loading
                </h1>
              }
            >
              {" "}
              <ImageComponent imageInfo={item.data.logo} />
            </React.Suspense>
          ) : (
            <h1 className={style.empty__header}>{item.data.name}</h1>
          )}
          <h1 className={style.itemPage__container__header}>
            {item.data.name}
          </h1>
        </div>
        <button
          className={style.itemPage__container__items__item__iframebtn}
          onClick={OpenIframe}
          ref={iframebtn}
        />
        <div className={style.itemPage__container__items}>
          <div
            className={style.itemPage__container__items__item}
            ref={IframeBlock}
          >
            <iframe
              src={"https://alfabit.org"}
              className={style.itemPage__container__Iframe}
            />
          </div>
          {hideBlocks !== true && <ItemPageInfoBlock item={item} ShowReviews={ShowReviews} />}
          {hideBlocks !== true && <ItemPageExchangerDescription item={item} />}
        </div>
        <div className={style.itemPage__exchangermarks}>
          <h1>Метки обменника {item.data.name}:</h1>
          <div>
            {Object.keys(item.data.mark_types).length != 0 ? (
              <Marks prop={item.data.mark_types} />
            ) : (
              <p>меток нет</p>
            )}
          </div>
        </div>
      </div>
      <div className={style.itemPage__comments}>
        <h1 className={style.itemPage__reviews__header}>
          Отзывы {item.data.name}
        </h1>
        {review != null ? (
          review.map((item) => (
            <Comments props={item} review={setReview} w={"30%"} />
          ))
        ) : (
          <div></div>
        )}
      </div>
      <Footer />
    </div>
  );
};

/*            {/*item.data.iframe.src === "" ? (
              <h1 className={style.empty}>{item.data.name}</h1>
            ) : (
            )*/
