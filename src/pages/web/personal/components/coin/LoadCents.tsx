import "../../styles/loadcent.scss";
import { useState, useEffect } from "react";
import { Modal } from "antd";
import axios from "axios";
import PaymentStep1 from "../popup/PaymentStep1";
import BankStep2 from "../popup/bank/BankStep2";
import WalletStep2 from "../popup/wallet/WalletStep2";
import CardStep2 from "../popup/card/CardStep2";
import PaymentRequestSuccess from "../popup/PaymentRequestSuccess";

const LoadCents = () => {
  const [bankInfo, setBankInfo] = useState<any[]>([]);
  const [walletInfo, setwalletInfo] = useState<any[]>([]);
  const [card, setCard] = useState<any[]>([]);
  const [bankInfoItem, setBankInfoItem] = useState<any>();
  const [walletInfoItem, setWalletInfoItem] = useState<any>();
  const [cardInfoItem, setCardInfoItem] = useState<any>();
  const [checkSuccess, setCheckSuccess] = useState<boolean>(false);
  const [isModalBankOpen, setIsModalBankOpen] = useState(false);
  const [isModalWalletOpen, setIsModalWalletOpen] = useState(false);
  const [isModalCardOpen, setIsModalCardOpen] = useState(false);
  const [showCopy, setShowCopy] = useState(false);
  const [transitionCode, setTransitionCode] = useState<string>("");

  const callBankInfo = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}load_cent_info`)
      .then((res) => {
        setBankInfo(res.data.bank_info);
        setwalletInfo(res.data.wallet_info);
        setCard(res.data.card);
      });
  };

  const getTransitionCode = () => {
    setTransitionCode("TV" + Math.floor(Math.random() * 100000000000));
  };

  const handleCopy = (e: any) => {
    navigator.clipboard.writeText(e.target.innerText);
    setShowCopy(true);
  };

  useEffect(() => {
    if (transitionCode) {
      let id = setTimeout(() => {
        getTransitionCode();
      }, 600000);
      return () => clearTimeout(id);
    }
  }, [transitionCode]);

  useEffect(() => {
    callBankInfo();
  }, []);

  useEffect(() => {
    if (showCopy) {
      let id = setTimeout(() => setShowCopy(false), 1000);
      return () => clearTimeout(id);
    }
  }, [showCopy]);

  return (
    <>
      <div className="load__cents">
        <div
          className="load__cents--item"
          onClick={() => {
            setIsModalBankOpen(true);
            getTransitionCode();
          }}
        >
          <div className="load-cents__center">
            <i className="fa-solid fa-building-columns"></i>
            <div>
              <p>Chuyển khoản ngân hàng</p>
              <span>Có XU nhanh trong vài phút</span>
            </div>
          </div>
        </div>
        <div
          className="load__cents--item"
          onClick={() => {
            getTransitionCode();
            setIsModalWalletOpen(true);
          }}
        >
          <div className="load-cents__center">
            <i className="fa-solid fa-wallet"></i>
            <div>
              <p>Ví điện tử</p>
              <span>Momo,ZaloPay,Paypal,...</span>
            </div>
          </div>
        </div>
        <div
          className="load__cents--item"
          onClick={() => {
            getTransitionCode();
            setIsModalCardOpen(true);
          }}
        >
          <div className="load-cents__center">
            <i className="fa-solid fa-address-card"></i>
            <div>
              <p>Thẻ cào</p>
              <span>Thẻ mobi,Viettel,Zing,...</span>
            </div>
          </div>
        </div>
      </div>

      {/* Thanh toán bằng ngân hàng */}
      <Modal
        title={<h4>Chuyển khoản ngân hàng</h4>}
        open={isModalBankOpen}
        onCancel={() => {
          setIsModalBankOpen(false);
          setBankInfoItem("");
          setCheckSuccess(false);
          setTransitionCode("");
        }}
        className="modal-payment"
      >
        {!checkSuccess ? (
          !bankInfoItem ? (
            <PaymentStep1
              setIsModal={setIsModalBankOpen}
              data={bankInfo}
              setInfoItem={setBankInfoItem}
              transitionCode={transitionCode}
            />
          ) : (
            <BankStep2
              bankInfo={bankInfoItem}
              setBankInfoItem={setBankInfoItem}
              handleCopy={handleCopy}
              showCopy={showCopy}
              setCheckSuccess={setCheckSuccess}
            />
          )
        ) : (
          <PaymentRequestSuccess
            setIsModal={setIsModalBankOpen}
            setInfoItem={setBankInfoItem}
            setCheckSuccess={setCheckSuccess}
          />
        )}
      </Modal>

      {/* Thanh toán bằng ví */}
      <Modal
        title={<h4>Ví điện tử</h4>}
        open={isModalWalletOpen}
        onCancel={() => {
          setIsModalWalletOpen(false);
          setWalletInfoItem("");
          setCheckSuccess(false);
          setTransitionCode("");
        }}
        className="modal-payment"
      >
        {!checkSuccess ? (
          !walletInfoItem ? (
            <PaymentStep1
              setIsModal={setIsModalWalletOpen}
              data={walletInfo}
              setInfoItem={setWalletInfoItem}
              transitionCode={transitionCode}
            />
          ) : (
            <WalletStep2
              walletInfo={walletInfoItem}
              setWalletInfoItem={setWalletInfoItem}
              handleCopy={handleCopy}
              showCopy={showCopy}
              setCheckSuccess={setCheckSuccess}
            />
          )
        ) : (
          <PaymentRequestSuccess
            setIsModal={setIsModalWalletOpen}
            setInfoItem={setWalletInfoItem}
            setCheckSuccess={setCheckSuccess}
          />
        )}
      </Modal>

      {/* Thanh toán bằng thẻ cào */}
      <Modal
        title={<h4>Thẻ cào</h4>}
        open={isModalCardOpen}
        onCancel={() => {
          setIsModalCardOpen(false);
          setCardInfoItem("");
          setCheckSuccess(false);
          setTransitionCode("");
        }}
        className="modal-payment"
      >
        {!checkSuccess ? (
          !cardInfoItem ? (
            <PaymentStep1
              setIsModal={setIsModalCardOpen}
              data={card}
              setInfoItem={setCardInfoItem}
              transitionCode={transitionCode}
            />
          ) : (
            <CardStep2
              cardInfo={cardInfoItem}
              setCardInfoItem={setCardInfoItem}
              setCheckSuccess={setCheckSuccess}
            />
          )
        ) : (
          <PaymentRequestSuccess
            setIsModal={setIsModalCardOpen}
            setInfoItem={setCardInfoItem}
            setCheckSuccess={setCheckSuccess}
          />
        )}
      </Modal>
    </>
  );
};

export default LoadCents;
