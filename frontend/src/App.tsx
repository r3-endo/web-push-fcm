import React, { useEffect, useState } from "react";
import "./App.css";
import { firebaseConfig, vapidKey } from "./config";
import { initializeApp } from "firebase/app";
import { deleteToken, getMessaging, getToken } from "firebase/messaging";
import { Header } from "./components/molecules/layout/Header";
import { Card } from "./components/atoms/card/Card";

initializeApp(firebaseConfig);
const messaging = getMessaging();

function App() {
  const [currentToken, setCurrentToken] = useState("");
  useEffect(() => {
    setUp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setUp = async () => {
    await registerServiceWorker();
    await requestTokenToServer();
  };

  const registerServiceWorker = async () => {
    try {
      if ("serviceWorker" in navigator && "PushManager" in window) {
        const swReg = await navigator.serviceWorker.register(
          "../firebase-messaging-sw.js",
        );
        console.log("ServiceWorkerを登録しました", swReg);
      } else {
        console.log("すでにServiceWorkerが登録済みです");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const canPushNotification =
    "serviceWorker" in navigator && "PushManager" in window;

  // FCMからトークンを取得する
  const requestTokenToServer = async () => {
    try {
      const currentToken = await getToken(messaging, {
        vapidKey: vapidKey,
      });
      setCurrentToken(currentToken);

      if (currentToken) {
        console.log("Current Token for client", currentToken);
      } else {
        console.log("No Token for client");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // 通知許可を確認する
  const requestPermission = async () => {
    const registration = await navigator.serviceWorker.ready;
    if (!registration) {
      console.log("serviceWorkerが未登録です");
    }
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      console.log("granted");
    } else {
      console.log("unable to get permission");
    }
  };

  // FCMから通知を削除する
  const deleteTokenFromFirebase = async () => {
    try {
      await getToken(messaging);
      await deleteToken(messaging);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="App">
      <Header
        onRequestPermission={requestPermission}
        onDeleteTokenFromFirebase={deleteTokenFromFirebase}
      ></Header>
      {canPushNotification ? (
        <>
          <div className="text">Push通知対応</div>
          <Card>
            <h3>トークン情報</h3>
            <div>{currentToken}</div>
          </Card>
        </>
      ) : (
        <>Push通知非対応</>
      )}
    </div>
  );
}

export default App;
