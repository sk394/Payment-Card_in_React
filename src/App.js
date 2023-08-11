import "./styles.css";
import React, { useState, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import InputMask from "react-input-mask";

const PaymentBySuman = () => {
  const [currentCardBackground] = useState(Math.floor(Math.random() * 25 + 1));
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardMonth, setCardMonth] = useState("");
  const [cardYear, setCardYear] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const minCardYear = new Date().getFullYear();
  let amexCardMask = "0000 000000 00000";
  let otherCardMask = "0000 0000 0000 0000";
  const [cardNumberTemp, setCardNumberTemp] = useState("");
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [focusElementStyle, setFocusElementStyle] = useState(null);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const getCardType = () => {
    let number = cardNumber;
    let re = new RegExp("^4");
    if (number.match(re) != null) return "visa";

    re = new RegExp("^(34|37)");
    if (number.match(re) != null) return "amex";

    re = new RegExp("^5[1-5]");
    if (number.match(re) != null) return "mastercard";

    re = new RegExp("^6011");
    if (number.match(re) != null) return "discover";

    re = new RegExp("^9792");
    if (number.match(re) != null) return "troy";

    return "visa"; // default type
  };

  const minCardMonth = () => {
    if (cardYear === minCardYear) return new Date().getMonth() + 1;
    return 1;
  };

  const flipCard = (status) => {
    setIsCardFlipped(status);
  };

  const focusInput = (e) => {
    setIsInputFocused(true);
    let targetRef = e.target.dataset.ref;
    let target = document.querySelector(`[data-ref="${targetRef}"]`);
    setFocusElementStyle({
      width: `${target.offsetWidth}px`,
      height: `${target.offsetHeight}px`,
      transform: `translateX(${target.offsetLeft}px) translateY(${target.offsetTop}px)`
    });
  };

  const blurInput = () => {
    setTimeout(() => {
      if (!isInputFocused) {
        setFocusElementStyle(null);
      }
    }, 300);
    setIsInputFocused(false);
  };

  useEffect(() => {
    const cardNumberInput = document.getElementById("cardNumber");
    if (cardNumberInput) {
      cardNumberInput.focus();
    }
    setCardNumberTemp(otherCardMask);
    document.getElementById("cardNumber").focus();
  }, [cardMonth, cardYear, setCardMonth, otherCardMask]);

  return (
    <div className="wrapper" id="app">
      <div className="card-form">
        <div className="card-list">
          <div className={`card-item ${isCardFlipped ? "-active" : ""}`}>
            <div className="card-item__side -front">
              <div
                className={`card-item__focus ${
                  focusElementStyle ? "-active" : ""
                }`}
                style={focusElementStyle}
              ></div>
              <div className="card-item__cover">
                <img
                  src={`https://res.cloudinary.com/dbmnocnnp/image/upload/v1691770631/Cards/${currentCardBackground}.jpg`}
                  className="card-item__bg"
                  alt=""
                />
              </div>
              <div className="card-item__wrapper">
                <div className="card-item__top">
                  <img
                    src="https://res.cloudinary.com/dbmnocnnp/image/upload/v1691770628/Cards/chip.png"
                    className="card-item__chip"
                    alt=""
                  />
                  <span
                    style={{
                      color: "white",
                      fontSize: "12px",
                      marginTop: "13px"
                    }}
                  >
                    Written By
                    <a
                      href="https://github.com/sk394/Interactive-Payment-Card_in_React"
                      target="__blank"
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      &nbsp;Suman
                    </a>{" "}
                  </span>
                  <div className="card-item__type">
                    <CSSTransition className="slide-fade-up" timeout={300}>
                      {getCardType && (
                        <img
                          src={`https://res.cloudinary.com/dbmnocnnp/image/upload/v1691770628/Cards/${getCardType()}.png`}
                          key={getCardType()}
                          alt=""
                          className="card-item__typeImg"
                        />
                      )}
                    </CSSTransition>
                  </div>
                </div>
                <label
                  htmlFor="cardNumber"
                  className="card-item__number"
                  data-ref="cardNumber"
                >
                  {getCardType() === "amex" && (
                    <span>
                      {amexCardMask.split("").map((n, index) => (
                        <CSSTransition
                          key={index}
                          classNames="slide-fade-up"
                          timeout={300}
                        >
                          <div
                            className={`card-item__numberItem ${
                              index > 4 &&
                              index < 14 &&
                              cardNumber.length > index &&
                              n.trim() !== ""
                                ? ""
                                : "-active"
                            }`}
                          >
                            {index > 4 &&
                            index < 14 &&
                            cardNumber.length > index &&
                            n.trim() !== ""
                              ? "*"
                              : cardNumber.length > index
                              ? cardNumber[index]
                              : n}
                          </div>
                        </CSSTransition>
                      ))}
                    </span>
                  )}
                  {getCardType() !== "amex" && (
                    <span>
                      {otherCardMask.split("").map((n, index) => (
                        <CSSTransition
                          key={index}
                          classNames="slide-fade-up"
                          timeout={300}
                        >
                          <div
                            className={`card-item__numberItem ${
                              index > 4 &&
                              index < 15 &&
                              cardNumber.length > index &&
                              n.trim() !== ""
                                ? ""
                                : "-active"
                            }`}
                          >
                            {index > 4 &&
                            index < 15 &&
                            cardNumber.length > index &&
                            n.trim() !== ""
                              ? "*"
                              : cardNumber.length > index
                              ? cardNumber[index]
                              : n}
                          </div>
                        </CSSTransition>
                      ))}
                    </span>
                  )}
                </label>
                <div className="card-item__content">
                  <label
                    htmlFor="cardName"
                    className="card-item__info"
                    data-ref="cardName"
                  >
                    <div className="card-item__holder">Card Holder</div>
                    <div className="slide-fade-up">
                      <div className="card-item__name">
                        {cardName.length > 0 && (
                          <TransitionGroup>
                            <CSSTransition
                              key="1"
                              classNames="slide-fade-right"
                              timeout={300}
                            >
                              <span className="card-item__nameItem">
                                {cardName
                                  .replace(/\s\s+/g, " ")
                                  .split("")
                                  .map((n, index) => (
                                    <span key={index + 1}>{n}</span>
                                  ))}
                              </span>
                            </CSSTransition>
                          </TransitionGroup>
                        )}
                      </div>
                      <div className="card-item__name" key="2"></div>
                    </div>
                  </label>
                  <div className="card-item__date">
                    <label htmlFor="cardMonth" className="card-item__dateTitle">
                      Expires
                    </label>
                    <label
                      htmlFor="cardMonth"
                      className="card-item__dateItem"
                      data-ref="cardDate"
                    >
                      <CSSTransition className="slide-fade-up" timeout={200}>
                        {cardMonth ? (
                          <span key={cardMonth}>{cardMonth}</span>
                        ) : (
                          <span key="2">MM</span>
                        )}
                      </CSSTransition>
                    </label>
                    /
                    <label
                      htmlFor="cardYear"
                      className="card-item__dateItem"
                      data-ref="cardDate"
                    >
                      <CSSTransition className="slide-fade-up" timeout={200}>
                        {cardYear ? (
                          <span key={cardYear}>
                            {String(cardYear).slice(2, 4)}
                          </span>
                        ) : (
                          <span key="2">YY</span>
                        )}
                      </CSSTransition>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-item__side -back">
              <div className="card-item__cover">
                <img
                  src={`https://res.cloudinary.com/dbmnocnnp/image/upload/v1691770631/Cards/${currentCardBackground}.jpg`}
                  className="card-item__bg"
                  alt="Card Background"
                />
              </div>
              <div className="card-item__band"></div>
              <div className="card-item__cvv">
                <div className="card-item__cvvTitle">CVV</div>
                <div className="card-item__cvvBand">
                  {cardCvv.split("").map((n, index) => (
                    <span key={index}>*</span>
                  ))}
                </div>
                <div className="card-item__type">
                  {getCardType() && (
                    <img
                      src={`https://res.cloudinary.com/dbmnocnnp/image/upload/v1691770628/Cards/${getCardType()}.png`}
                      className="card-item__typeImg"
                      alt=""
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card-form__inner">
          <div className="card-input">
            <label htmlFor="cardNumber" className="card-input__label">
              Card Number
              <span
                style={{
                  textSize: "2px",
                  color: "#999",
                  marginTop: "0",
                  fontSize: "13px"
                }}
              >
                (#### #### #### ####)
              </span>
            </label>

            <InputMask
              type="text"
              id="cardNumber"
              className="card-input__input"
              value={cardNumber}
              onFocus={focusInput}
              onBlur={blurInput}
              data-ref="cardNumber"
              autoComplete="off"
              onChange={(e) => setCardNumber(e.target.value)}
            />
          </div>
          <div className="card-input">
            <label htmlFor="cardName" className="card-input__label">
              Card Holder Name
            </label>
            <input
              type="text"
              id="cardName"
              className="card-input__input"
              value={cardName}
              onFocus={(e) => focusInput(e)}
              onBlur={(e) => blurInput(e)}
              data-ref="cardName"
              autoComplete="off"
              onChange={(e) => setCardName(e.target.value)}
            />
          </div>
          <div className="card-form__row">
            <div className="card-form__col">
              <div className="card-form__group">
                <label htmlFor="cardMonth" className="card-input__label">
                  Expiration Date
                </label>
                <select
                  className="card-input__input -select"
                  id="cardMonth"
                  value={cardMonth}
                  onFocus={(e) => focusInput(e)}
                  onBlur={(e) => blurInput(e)}
                  data-ref="cardDate"
                  onChange={(e) => setCardMonth(e.target.value)}
                >
                  <option value="" disabled>
                    Month
                  </option>
                  {Array.from({ length: 12 }, (_, index) => index + 1).map(
                    (n) => (
                      <option
                        value={n < 10 ? "0" + n : n}
                        disabled={n < minCardMonth}
                        key={n}
                      >
                        {n < 10 ? "0" + n : n}
                      </option>
                    )
                  )}
                </select>

                <select
                  className="card-input__input -select"
                  id="cardYear"
                  value={cardYear}
                  onFocus={(e) => focusInput(e)}
                  onBlur={(e) => blurInput(e)}
                  data-ref="cardDate"
                  onChange={(e) => setCardYear(e.target.value)}
                >
                  <option value="" disabled>
                    Year
                  </option>
                  {Array.from(
                    { length: 12 },
                    (_, index) => index + minCardYear
                  ).map((n) => (
                    <option value={n} key={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="card-form__col -cvv">
              <div className="card-input">
                <label htmlFor="cardCvv" className="card-input__label">
                  CVV
                </label>
                <input
                  type="text"
                  className="card-input__input"
                  id="cardCvv"
                  maxLength={4}
                  value={cardCvv}
                  onFocus={() => flipCard(true)}
                  onBlur={() => flipCard(false)}
                  onChange={(e) => setCardCvv(e.target.value)}
                  autoComplete="off"
                />
              </div>
            </div>
          </div>

          <button className="card-form__button">Submit</button>
        </div>
      </div>
    </div>
  );
};

export default PaymentBySuman;
